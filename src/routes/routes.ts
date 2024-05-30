import { Router } from "express";
import authRoutes from "./custom/auth.routes";
import orderRoutes from "./custom/order.routes";
import watchRoutes from "./custom/watch.routes";

const rootRouter = Router();

rootRouter.use('/auth', authRoutes)
rootRouter.use('/watch', watchRoutes)
rootRouter.use('/orders', orderRoutes)

export default rootRouter;


