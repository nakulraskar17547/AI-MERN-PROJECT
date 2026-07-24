import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createCheckoutSession, handleWebhook, verifyPayment } from "../controllers/billing.controller.js";

const billingRouter = express.Router();

billingRouter.post("/", isAuth, createCheckoutSession);
billingRouter.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);
billingRouter.post("/verify", isAuth, verifyPayment);

export default billingRouter;
