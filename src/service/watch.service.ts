import {Prisma, Watch} from "@prisma/client";
import {WatchSchema} from "../schema/watch.schema";
import {UnprocessableEntity} from "../util/exceptions/ValidationException";
import {ErrorCodes, HttpException} from "../util/exceptions/HttpException";
import {prismaClient} from "../index";

export const saveWatch = async (watchDto:any) => {
    console.log("WatchService : saveWatch() {} :")
    try {
        WatchSchema.parse(watchDto);

        console.log(watchDto)
        return await prismaClient.watch.create({
            data: watchDto
        });
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

export const findById = async (id:string)=> {
    console.log("WatchService : findById() {} :")
    try {
        return prismaClient.watch.findUnique({
            where: {id}
        })
    } catch (error: any) {
        throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
    }
}

//write updateWatch method

export const updateWatch = async (id: string, watchDto: any): Promise<Watch> => {
    console.log("WatchService : updateWatch() {} :")
    try {
        WatchSchema.partial().parse(watchDto); // Validate partial data
        return await prismaClient.watch.update({
            where: { id },
            data: watchDto
        });
    } catch (error: any) {
        if (error.name === 'ZodError') {
            throw new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR);
        } else {
            throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
        }
    }
};