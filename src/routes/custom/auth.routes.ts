import {Router} from "express";
import {login, signup} from "../../controllers/auth.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";

const authRoutes: Router = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/test", authMiddleware, (req, res) => {
    res.send("Hello from test route");
});

export default authRoutes;
