import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.routes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"
const app = express()
app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://ai-mern-project-liu8.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
].filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            return callback(null, origin)
        }
        return callback(null, origin)
    },
    credentials: true
}))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)
app.listen(port,()=> {
    console.log("server started")
    connectDb()
})
