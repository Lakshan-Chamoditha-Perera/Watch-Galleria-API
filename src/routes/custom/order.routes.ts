import { Router } from "express";
import * as OrderController from "../../controllers/order.controller";

const orderRoutes: Router = Router();

orderRoutes.post("/", OrderController.createOrder);

export default orderRoutes;