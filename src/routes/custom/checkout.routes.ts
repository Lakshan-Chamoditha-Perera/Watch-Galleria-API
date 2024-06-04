import { Router } from "express";
import * as CheckOutController from "../../controllers/checkout.controller";

const orderRoutes: Router = Router();
orderRoutes.post("", CheckOutController.createCheckoutSession);

export default orderRoutes;