import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserModel } from "../schema/users.schema";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("AuthMiddleware : authMiddleware() {} :");

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("Authorization token missing");
    }

    try {
        const payload: { email: string } = verify(token, process.env.JWT_SECRET as string) as { email: string };
        const user = await UserModel.findOne({ email: payload.email });

        if (!user) {
            return res.status(401).send("User not found");
        }
        req.body = { ...req.body, user };
        next();
    } catch (error) {
        return res.status(401).send("Invalid token or token expired");
    }
}
