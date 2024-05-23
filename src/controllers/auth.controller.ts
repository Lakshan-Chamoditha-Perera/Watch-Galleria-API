import {NextFunction, Request, Response} from "express";
import {UnprocessableEntity} from "../util/exceptions/ValidationException";
import * as UserService from "../service/user.service";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {compareSync} from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;
        const user = await UserService.createUser({email, password, name});

        res.status(201).send(user);
    } catch (error: any) {
        if (error.name === 'ZodError') {
            next(new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR));
        } else {
            next(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
        }
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new HttpException("Please provide email and password", ErrorCodes.INVALID_INPUT, 400, null));
    }

    try {
        const user = await UserService.getUserByEmail(email);

        if (!user) {
            return next(new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null));
        }

        if (!compareSync(password, user.password)) {
            return next(new HttpException("Incorrect password", ErrorCodes.INCORRECT_PASSWORD, 401, null));
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {expiresIn: '1h'});

        res.send({ user, token });
    } catch (error) {
        next(new HttpException("Internal Server Error", ErrorCodes.SERVER_ERROR, 500, error));
    }
}
