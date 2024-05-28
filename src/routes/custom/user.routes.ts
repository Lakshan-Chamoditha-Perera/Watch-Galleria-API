import {Router} from "express";
import * as UserController from "../../controllers/user.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";
const userRoutes: Router = Router();

userRoutes.get("/:email", UserController.getUserByEmail);

export default userRoutes;