import { Router } from "express";
import * as OrderController from "../../controllers/order.controller";

const orderRoutes: Router = Router();

orderRoutes.post("/", OrderController.createOrder);
orderRoutes.get("/:email", OrderController.getOrdersByEmail);
orderRoutes.post("/checkout", OrderController.createCheckoutSession);

export default orderRoutes;