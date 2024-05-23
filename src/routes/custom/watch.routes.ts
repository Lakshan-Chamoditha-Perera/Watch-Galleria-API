import {Router} from "express";
import * as WatchController from "../../controllers/watch.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";
const watchRoutes: Router = Router();

watchRoutes.post("/", authMiddleware,WatchController.createItem);


export default watchRoutes;