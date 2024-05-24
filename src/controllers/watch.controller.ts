import {NextFunction, Request, Response} from 'express';
import {UnprocessableEntity} from "../util/exceptions/ValidationException";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {getAll, saveWatch} from "../service/watch.service";
import {Watch} from "@prisma/client";
import {StandardResponse} from "../util/payloads/StandardResponse";

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
    console.log('WatchController : createItem() {} :');
    try {
        const {
            title, description, price, model, rating, quantity, imageUrlList,
        } = req.body;

        let watch: Watch = await saveWatch({
            title, description, price, model, rating, quantity, imageUrlList,
        });
        res.status(201).send(new StandardResponse(201, "Watch created successfully", watch));
    } catch (error: any) {
        if (error.name === 'ZodError') {
            next(new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR));
        } else {
            next(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
        }
    }
}

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('WatchController : getItems() {} :');

        let watchItems = await getAll();
        res.status(200).send(new StandardResponse(200, "Watch items retrieved successfully.", watchItems));

    } catch (error: any) {
        next(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
    }
}
