import { Router } from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { checkout,
    paymentVerification,sendRazorApiKey } from "../controllers/paymentController.js";

const paymentRoutes = Router()




paymentRoutes.post("/checkout",isAuthenticatedUser,checkout)
paymentRoutes.post("/paymentVerification",isAuthenticatedUser,paymentVerification)
paymentRoutes.post("/razorpayApiKey",isAuthenticatedUser,sendRazorApiKey)


export default paymentRoutes

