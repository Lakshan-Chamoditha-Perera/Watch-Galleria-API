import {NextFunction, Request, Response} from 'express';
import {UnprocessableEntity} from "../util/exceptions/ValidationException";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {saveWatch} from "../service/watch.service";

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
    console.log('WatchController : createItem() {} :');
    try {
        const {
            title, description, price, model, rating, quantity, imageUrlList,
        } = req.body;

        let response = await saveWatch({
            title, description, price, model, rating, quantity, imageUrlList,
        });
        res.status(201).send({ message: "Watch created successfully",response });
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

    } catch (error: any) {
        next(error)
    }
}
