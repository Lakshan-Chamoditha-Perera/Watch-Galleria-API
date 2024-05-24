import {Router} from "express";
import * as WatchController from "../../controllers/watch.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";
const watchRoutes: Router = Router();

watchRoutes.post("/", authMiddleware,WatchController.createItem);
watchRoutes.get("/", authMiddleware,WatchController.getItems);
watchRoutes.get("/:id", authMiddleware,WatchController.findWatchById);
watchRoutes.put("/:id", authMiddleware,WatchController.updateWatchById);

export default watchRoutes;