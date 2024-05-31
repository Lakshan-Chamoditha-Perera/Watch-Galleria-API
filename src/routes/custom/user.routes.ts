import {Router} from "express";
import multer from "multer";
import * as UserController from "../../controllers/user.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";
const userRoutes: Router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRoutes.get("/:email", UserController.getUserByEmail);
userRoutes.post("/profile_image/:email",upload.any(), UserController.profileImageChange);

export default userRoutes;