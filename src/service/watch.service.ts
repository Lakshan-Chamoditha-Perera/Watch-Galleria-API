import {Prisma, Watch} from "@prisma/client";
import {WatchSchema} from "../schema/watch.schema";
import {UnprocessableEntity} from "../util/exceptions/ValidationException";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {prismaClient} from "../index";

export const saveWatch = async (watchDto:any) => {
    console.log("WatchService : saveWatch() {} :")
    try {
        WatchSchema.parse(watchDto);
        return prismaClient.watch.create(watchDto);
     } catch (error: any) {
        if (error.name === 'ZodError') {
            throw new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR);
        } else {
            throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
        }
    }
};

export const getAll = async ()=> {
    console.log("WatchService : getWatchItems() {} :")
    try {
        return prismaClient.watch.findMany();
    } catch (error: any) {
        throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
    }
}