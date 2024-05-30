import { Router } from "express";
import * as WatchController from "../../controllers/watch.controller";
import multer from "multer"; //npm i --save-dev @types/multer

const watchRoutes: Router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

watchRoutes.post("/", upload.any(), WatchController.createItem);
watchRoutes.get("/", WatchController.getItems);
watchRoutes.get("/:id", WatchController.findWatchById);

export default watchRoutes;