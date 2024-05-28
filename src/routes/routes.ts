import { Router } from "express";
import authRoutes from "./custom/auth.routes";

const rootRouter = Router();

rootRouter.use('/auth', authRoutes)


export default rootRouter;

