import { Request, Response } from 'express';
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";
import { findByItemCode, getAll, saveWatch, updateWatch, deleteWatch } from "../service/watch.service";
import { StandardResponse } from "../util/payloads/StandardResponse";
import { WatchDto } from "../dto/watch.dto";

export const createItem = async (req: Request, res: Response,) => {
    console.log('WatchController : createItem() {} :');
    try {

        let files: any[] = [];
        if (req.files) {
            if (Array.isArray(req.files)) {
                files = req.files;
            } else {
                files = Object.values(req.files).flat();
            }
        }
        let watch: WatchDto = {
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
        let isSaved = await saveWatch(watch, files);
        res.status(201).send(new StandardResponse(201, "Watch created successfully", isSaved));
    } catch (error: any) {
        if (error.name === 'ZodError') {
            console.log('ZodError')
            res.status(422).send(new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR));
        } else {
            console.log('Server Error : ' + error.message)
            res.status(500).send(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
        }
    }
    console.log("---------------------------------------")
}

export const getItems = async (req: Request, res: Response) => {
    try {
        console.log('WatchController : getItems() {} :');
        const watchItems = await getAll();
        res.status(200).send({ status: 200, message: "Watch items retrieved successfully.", data: watchItems });
    } catch (error: any) {
        res.status(500).send({ status: 500, message: "Server Error", error: error.message });
    }
};

export const findWatchById = async (req: Request, res: Response) => {
    try {
        console.log('WatchController : findById() {} :');
        let id = req.params.id;
        let watch = await findByItemCode(id);
        res.status(200).send(new StandardResponse(200, "Watch item retrieved successfully.", watch));
    } catch (error: any) {
        // next(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        console.log('WatchController : deleteWatch() {} :');
        let itemCode = req.params.itemCode;
        let deletedWatch = await deleteWatch(itemCode);
        res.status(200).send(new StandardResponse(200, "Watch item deleted successfully.", deletedWatch));
    } catch (error: any) {
        res.status(500).send(new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error));
    }
}