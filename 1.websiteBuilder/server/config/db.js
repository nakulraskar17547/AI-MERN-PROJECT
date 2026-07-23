import mongoose from "mongoose"

const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            tls: true,
            tlsAllowInvalidCertificates: true
        })
        console.log("db connected")
    } catch (error) {
        console.log("db error:", error.message)
    }
}
export default connectDb 