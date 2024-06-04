import { Router } from "express";
import authRoutes from "./custom/auth.routes";
import orderRoutes from "./custom/order.routes";
import watchRoutes from "./custom/watch.routes";
import userRoutes from "./custom/user.routes";
import checkoutRoutes from "./custom/checkout.routes";

const rootRouter = Router();

rootRouter.use('/auth', authRoutes)
rootRouter.use('/watch', watchRoutes)
rootRouter.use('/orders', orderRoutes)
rootRouter.use('/users',userRoutes)
rootRouter.use('/checkouts', checkoutRoutes)

export default rootRouter;


