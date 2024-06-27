import { Router } from "express";
import authRoutes from "./custom/auth.routes";
import orderRoutes from "./custom/order.routes";
import watchRoutes from "./custom/watch.routes";
import userRoutes from "./custom/user.routes";
import checkoutRoutes from "./custom/checkout.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

const rootRouter = Router();

rootRouter.use('/auth', authRoutes)
rootRouter.use('/watch',  watchRoutes)
rootRouter.use('/orders', authMiddleware, orderRoutes)
rootRouter.use('/users', authMiddleware, userRoutes)
rootRouter.use('/checkouts', authMiddleware, checkoutRoutes)

export default rootRouter;



