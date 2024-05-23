import { Router } from "express";
import authRoutes from "./auth.router";

const rootRouter = Router();

rootRouter.use('/auth', authRoutes)

export default rootRouter;

