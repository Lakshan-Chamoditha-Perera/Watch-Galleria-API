import { NextFunction, Request, Response } from "express";
import { HttpException } from "../util/exceptions/HttpException";
import {StandardResponse} from "../util/payloads/StandardResponse";

export const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error handling middleware {} "+error.message);
    res.status(error.statusCode || 500).json(
        new StandardResponse(error.statusCode || 500, error.message, error)
    );
};
