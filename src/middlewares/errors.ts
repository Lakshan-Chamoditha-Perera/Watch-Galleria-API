import { NextFunction, Request, Response } from "express";
import { HttpException } from "../util/exceptions/HttpException";

export const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error middleware : "+error.message);
    res.status(error.statusCode || 500).json({
        message: error.message,
        code: error.errorCode,
        errors: error.errors
    });
};
