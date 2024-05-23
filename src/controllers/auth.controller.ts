import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../index";
import { compareSync, hashSync } from "bcrypt";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";
import * as jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return next(new HttpException("Please provide email, password, and name", ErrorCodes.INVALID_INPUT, 400, null));
    }

    try {
        let user = await prismaClient.user.findFirst({
            where: { email }
        });

        if (user) {
            return next(new HttpException("User already exists", ErrorCodes.USER_ALREADY_EXISTS, 400, null));
        }

        user = await prismaClient.user.create({
            data: {
                email,
                password: hashSync(password, 10),
                name
            }
        });

        res.status(201).send(user);
    } catch (error) {
        next(new HttpException("Internal Server Error", ErrorCodes.SERVER_ERROR, 500, error));
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new HttpException("Please provide email and password", ErrorCodes.INVALID_INPUT, 400, null));
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: { email }
        });

        if (!user) {
            return next(new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null));
        }

        if (!compareSync(password, user.password)) {
            return next(new HttpException("Incorrect password", ErrorCodes.INCORRECT_PASSWORD, 401, null));
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.send({ user, token });
    } catch (error) {
        next(new HttpException("Internal Server Error", ErrorCodes.SERVER_ERROR, 500, error));
    }
}
