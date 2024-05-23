import { Request, Response } from "express";
import { prismaClient } from "../index";
import { hashSync } from "bcrypt";

export const register = async (req: Request, res: Response) => {
    res.send("Register route");
}

export const login = async (req: Request, res: Response) => {
    res.send("Login route");
}

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).send("Please provide email, password and name");
    }

    let user = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    });

    if (user) {
        return res.status(400).send("User already exists");
    }

    user = await prismaClient.user.create({
        data: {
            email: email,
            password: hashSync(password, 10),
            name: name
        }
    });

    res.send(user);

}