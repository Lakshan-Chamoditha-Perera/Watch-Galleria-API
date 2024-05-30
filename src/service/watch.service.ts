import { WatchSchema, WatchModel } from "../schema/watch.schema";
import { uploadImage } from "./firebase.service";
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";
import { WatchDto } from "../dto/watch.dto";

export const saveWatch = async (watchDto: WatchDto, images: any[]) => {
    console.log("WatchService: saveWatch() {} : watchDto:", watchDto, "images:", images);
    try {
        WatchSchema.parse(watchDto);
        console.log('validated..........');
        watchDto.imageUrlList = watchDto.imageUrlList || [];

        for (let i = 0; i < images.length; i++) {
            try {
                const imageUrl = await uploadImage(images[i]);
                watchDto.imageUrlList.push(imageUrl);
            } catch (imageError) {
                console.error('Error uploading image:', images[i], imageError);
                throw new HttpException('Error uploading image', ErrorCodes.SERVER_ERROR, 500, imageError);
            }
        }

        const newWatch = await WatchModel.create(watchDto);
        console.log('Watch saved:', newWatch);
        return newWatch;
    } catch (error: any) {
        console.log(error);
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

export const findByItemCode = async (itemCode: string) => {
    console.log("WatchService : findByItemCode() {} :")
    try {
        const watch = await WatchModel.findOne({ itemCode: itemCode });
        return watch ? watch.toObject() as WatchDto : null;
    } catch (error: any) {
        throw error;
    }
}

export const updateWatch = async (id: string, watchDto: WatchDto) => {
    console.log("WatchService: updateWatch() {} :");
    try {
        // Validate the watchDto against the WatchSchema
        WatchSchema.parse(watchDto);

        const updatedWatch = await WatchModel.findByIdAndUpdate(id, watchDto, { new: true });
        if (!updatedWatch) {
            throw new HttpException("Watch not found", ErrorCodes.WATCH_NOT_FOUND, 404, null);
        }

        return updatedWatch;
    } catch (error: any) {
        if (error.name === 'ZodError') {
            throw new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR);
        } else {
            throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
        }
    }
};

export const deleteWatch = async (itemCode: string) => {
    console.log("WatchService: deleteWatch() {} :");
    try {
        const result = await WatchModel.deleteOne({ itemCode: itemCode });
        if (result.deletedCount === 0) {
            console.log(`No watch found with itemCode: ${itemCode}`);
            throw new Error(`No watch found with itemCode: ${itemCode}`);
        }
        console.log(`Successfully deleted watch with itemCode: ${itemCode}`);
        return { success: true, message: 'Watch successfully deleted.' };

    } catch (error) {
        console.error(`Error deleting watch with itemCode: ${itemCode}`, error);
        throw error
    }
};