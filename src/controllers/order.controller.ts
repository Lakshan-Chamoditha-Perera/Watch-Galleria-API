import { Request, Response } from 'express';
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";

import { StandardResponse } from "../util/payloads/StandardResponse";
import { saveOrder } from '../service/order.service';

export const createOrder = async (req: Request, res: Response,) => {
    console.log('OrderController : createOrder() {} :');
    try {
        let order = req.body;
        console.log(order);
        let isSaved = await saveOrder(order);
        res.status(201).send(new StandardResponse(201, "Order created successfully", isSaved));
    } catch (error: any) {
        console.log('Error : ' + error)
        if (error.name === 'ZodError') {
            console.log('ZodError')
            res.status(422).send(error);
        } else {
            console.log('Server Error : ' + error.data)
            res.status(500).send(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
        }
    }
}

