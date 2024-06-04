import { WatchDto } from "../dto/watch.dto";
import { OrderSchema, OrderModel } from "../schema/orders.schema";
import { ErrorCodes, HttpException } from "../util/exceptions/HttpException";
import { UnprocessableEntity } from "../util/exceptions/ValidationException";
import { findByItemCode, updateWatch } from "./watch.service";

export const saveOrder = async (orderDto: any) => {
    console.log("OrderService: saveOrder() {} : orderDto :", orderDto);

    try {
        // Validate the orderDto against the OrderSchema
        await OrderSchema.parse(orderDto);

        let totalPrice = 0;

        if (orderDto.itemList) {
            for (const element of orderDto.itemList) {
                // @ts-ignore
                const item: WatchDto = await findByItemCode(element.itemCode);
                if (item) {
                    console.log("Item found:", item);
                    const newQuantity = item.quantity - element.quantity;

                    // Check if the new quantity is valid
                    if (newQuantity < 0) {
                        throw new Error(`Validation Error: Insufficient quantity for item ${item.itemCode}. Available: ${item.quantity}, requested: ${element.quantity}`);
                    }

                    const updatedItem = { ...item, quantity: newQuantity };
                    await updateWatch(item._id, updatedItem);

                    totalPrice += element.price * element.quantity;

                }

            }
        }

        orderDto.totalPrice = totalPrice;
        

        const newOrder = await OrderModel.create(orderDto);
        console.log("Order saved:", newOrder);
        return newOrder;
    } catch (error: any) {
        console.log(error);
        throw new Error(`OrderService: saveOrder() error: ${error.message}`);
    }
};

export const findOrdersByEmail = async (email: string) => {
    console.log("OrderService: getOrdersByEmail() {} : email :", email);
    try {
        const orders = await OrderModel.find({ userEmail: email });
        console.log("Orders fetched:", orders);
        return orders;
    }
    catch (error: any) {
        console.log(error);
        throw error;
    }
};

