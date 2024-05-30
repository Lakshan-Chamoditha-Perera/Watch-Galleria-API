import { WatchDto } from "../dto/watch.dto";
import { OrderSchema, OrderModel } from "../schema/orders.schema";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { findByItemCode, updateWatch } from "./watch.service";


export const saveOrder = async (orderDto: any) => {
    console.log("OrderService: saveOrder() {} : orderDto :", orderDto);

    try {
        // Validate the orderDto against the OrderSchema
        OrderSchema.parse(orderDto);
        if (orderDto.itemList) {
            for (const element of orderDto.itemList) {
                // @ts-ignore
                const item: WatchDto = await findByItemCode(element.itemCode);
                if (item) {
                    console.log("Item found:", item);
                    const newQuantity = item.quantity - element.quantity;
                    if (newQuantity < 0) {
                        throw new HttpException(`Not enough quantity for item ${item.itemCode}`, ErrorCodes.INVALID_INPUT, 400, null);
                    }
                    const updatedItem = { ...item, quantity: newQuantity };
                    await updateWatch(item._id, updatedItem);
                    console.log("Item updated:", updatedItem);
                } else {
                    throw new HttpException(`Item ${element.itemCode} not found`, ErrorCodes.WATCH_NOT_FOUND, 404, null);
                }
            }
        }

        const newOrder = await OrderModel.create(orderDto);
        console.log("Order saved:", newOrder);
        return newOrder;
    } catch (error: any) {
        console.log(error);
        if (error.name === 'ZodError') {
            throw new UnprocessableEntity(error.errors, "Validation Error", ErrorCodes.VALIDATION_ERROR);
        } else {
            throw new HttpException(error.message, ErrorCodes.SERVER_ERROR, 500, error);
        }
    }
};