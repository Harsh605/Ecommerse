import { Router } from "express";
import { createProduct, createProductReview, deleteProduct, deleteReview, getAllProducts, getProductReviews, getSingleProduct, updateProduct } from "../controllers/product-controllers.js";
import { isAuthenticatedUser, userRole } from "../middleware/auth.js";

const routes = Router()

routes.get("/product",getAllProducts)
routes.post("/admin/product/new",isAuthenticatedUser,userRole("admin"),createProduct)
routes.put("/admin/product/:id",isAuthenticatedUser,userRole("admin"),updateProduct)
routes.delete("/admin/product/:id",isAuthenticatedUser,userRole("admin"),deleteProduct)
routes.get("/product/:id",getSingleProduct)
routes.put("/review",isAuthenticatedUser,createProductReview)
routes.get("/reviews",getProductReviews)
routes.delete("/review/delete",isAuthenticatedUser,deleteReview)

export default routes