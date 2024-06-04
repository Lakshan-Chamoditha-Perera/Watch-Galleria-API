import { Request, Response } from 'express';
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";

import { StandardResponse } from "../util/payloads/StandardResponse";
import { saveOrder, findOrdersByEmail } from "../service/order.service";
import { custom } from 'zod';

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


export const getOrdersByEmail = async (req: Request, res: Response) => {
    console.log('OrderController : getOrdersByEmail() {} :');
    try {
        let email = req.params.email;
        console.log(email);
        let orders = await findOrdersByEmail(email);
        res.status(200).send(new StandardResponse(200, "Orders fetched successfully", orders));
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
