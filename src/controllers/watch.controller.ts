import { NextFunction, Request, Response } from 'express';
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";
import { findById, getAll, saveWatch, updateWatch } from "../service/watch.service";
import { StandardResponse } from "../util/payloads/StandardResponse";

export const createItem = async (req: Request, res: Response, ) => {
    console.log('WatchController : createItem() {} :');
    try {
        let watch = {
            itemCode: req.body.itemCode,
            productName: req.body.productName,
            description: req.body.description,
            category: req.body.category,
            price: Number.parseFloat(req.body.price),
            quantity: Number.parseInt(req.body.quantity),
            rating: Number.parseInt(req.body.rating),
            productDate: req.body.productDate,
            gender: req.body.gender,
            imageUrlList: []
        }

        if (!req.files) {
            throw new UnprocessableEntity([], "Images are required", ErrorCodes.VALIDATION_ERROR);
        }
        let isSaved = await saveWatch(watch,req.files);
        res.status(201).send(new StandardResponse(201, "Watch created successfully",isSaved));
    } catch (error: any) {
        if (error.name === 'ZodError') {
            console.log('ZodError')
            res.status(422).send(new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR));
        } else {
            console.log('Server Error : '+error.message)
            res.status(500).send(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
        }
    }

    console.log("---------------------------------------")
}
//
export const getItems = async (req: Request, res: Response, ) => {
    try {
        console.log('WatchController : getItems() {} :');

        let watchItems = await getAll();
        res.status(200).send(new StandardResponse(200, "Watch items retrieved successfully.", watchItems));

    } catch (error: any) {
        // next(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
    }
}

export const findWatchById = async (req: Request, res: Response) => {
    try {
        console.log('WatchController : findById() {} :');
        let id = req.params.id;
        let watch = await findById(id);
        res.status(200).send(new StandardResponse(200, "Watch item retrieved successfully.", watch));
    } catch (error: any) {
        // next(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
    }
}

export const updateWatchById = async (req: Request, res: Response, ) => {
    console.log('WatchController : updateWatchById() {} :');
    try {
        const id = req.params.id;
        const { title, description, price, model, rating, quantity, imageUrlList } = req.body;

        const updatedWatch = await updateWatch(id, { title, description, price, model, rating, quantity, imageUrlList });

        if (!updatedWatch) {
            // return next(new HttpException("Watch not found", ErrorCodes.USER_NOT_FOUND, 404, null));
        }

        res.status(200).send(new StandardResponse(200, "Watch updated successfully", updatedWatch));
    } catch (error: any) {
        if (error.name === 'ZodError') {
            // next(new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR));
        } else {
            // next(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
        }
    }
}