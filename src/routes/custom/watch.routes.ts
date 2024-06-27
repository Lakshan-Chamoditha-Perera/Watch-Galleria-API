import { Router } from "express";
import * as WatchController from "../../controllers/watch.controller";
import multer from "multer"; //npm i --save-dev @types/multer
import { authMiddleware } from "../../middlewares/auth.middleware";

const watchRoutes: Router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

watchRoutes.post("/",authMiddleware, upload.any(), WatchController.createItem);
watchRoutes.get("/", WatchController.getItems);
watchRoutes.get("/:id",authMiddleware, WatchController.findWatchById);
watchRoutes.delete("/:itemCode",authMiddleware, WatchController.deleteItem);

export default watchRoutes;