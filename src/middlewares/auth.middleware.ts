import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prismaClient } from "../index";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).send("Authorization token missing");
    }

    try {
        const payload: { userId: string } = verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const user = await prismaClient.user.findFirst({
            where: { id: payload.userId }
        });

        if (!user) {
            return res.status(401).send("User not found");
        }
        req.body = { ...req.body, user };
        next();
    } catch (error) {
        return res.status(401).send("Invalid token or token expired");
    }
}
