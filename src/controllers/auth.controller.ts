import {NextFunction, Request, Response} from "express";
import {UnprocessableEntity} from "../util/exceptions/ValidationException";
import * as UserService from "../service/user.service";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {compareSync} from "bcrypt";
import jwt from "jsonwebtoken";
import {StandardResponse} from "../util/payloads/StandardResponse";

export const signup = async (req: Request, res: Response) => {
    console.log("AuthController : signup")
    try {
        const {email, password, name,photoURL} = req.body;
        console.log("Email: ", email, "Password: ", password, "Name: ", name, "PhotoURL: ", photoURL);
        const user = await UserService.createUser(
            {
                email,
                password,
                name,
                photoURL,
                role: "USER"
            });
        res.status(201).send(user);
    } catch (error: any) {
        console.log("Error in signup: ", error);
        if (error.name === 'ZodError') {
            const validationError = new UnprocessableEntity(error, "Validation Error", ErrorCodes.VALIDATION_ERROR);
            res.status(400).json(new StandardResponse(400, "Validation Error", validationError));
        } else {
            const serverError = new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
            res.status(500).json(new StandardResponse(500, serverError.message, serverError));
        }
    }

}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return next(new StandardResponse(400, "Validation Error", new HttpException("Please provide email and password", ErrorCodes.INVALID_INPUT, 400, null)))
        }

        const user = await UserService.getUserByEmail(email);
        if (!user) {
            console.log("User not found");
            return next(new StandardResponse(404, "User not found", new HttpException("User not found", ErrorCodes.USER_NOT_FOUND, 404, null)))
        }

        if (!compareSync(password, user.password)) {
            console.log("Incorrect password");
            return next(new StandardResponse(401, "Incorrect password", new HttpException("Incorrect password", ErrorCodes.INCORRECT_PASSWORD, 401, null)));
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string, {expiresIn: '30d'});
        res.send(new StandardResponse(200, "Login successful", {user, token}));
    } catch (error: any) {
        console.log("Error in login: ", error);
        new StandardResponse(500, "Internal Server Error", new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
    }
}
