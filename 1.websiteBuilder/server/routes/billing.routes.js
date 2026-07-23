import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createCheckoutSession, handleWebhook } from "../controllers/billing.controller.js";

const billingRouter = express.Router();

billingRouter.post("/", isAuth, createCheckoutSession);
billingRouter.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);

export default billingRouter;
