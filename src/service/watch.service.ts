import { WatchSchema, WatchModel } from "../schema/watch.schema";
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";

export const saveWatch = async (watchDto: any) => {
    console.log("WatchService : saveWatch() {} :")
    try {
        WatchSchema.parse(watchDto);


        WatchModel.create(watchDto);

    } catch (error: any) {
        if (error.name === 'ZodError') {
            throw new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR);
        } else {
            throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
        }
    }
};

export const getAll = async () => {
    console.log("WatchService : getWatchItems() {} :")
    try {
        return WatchModel.find();
    } catch (error: any) {
        throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
    }
}

export const findById = async (id: string) => {
    console.log("WatchService : findById() {} :")
    try {
        return WatchModel.findById(id);
    } catch (error: any) {
        throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
    }
}

//write updateWatch method

export const updateWatch = async (id: string, watchDto: any) => {
    console.log("WatchService : updateWatch() {} :")
    try {
        WatchSchema.partial().parse(watchDto); // Validate partial data
        return null;
    } catch (error: any) {
        if (error.name === 'ZodError') {
            throw new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR);
        } else {
            throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
        }
    }
};