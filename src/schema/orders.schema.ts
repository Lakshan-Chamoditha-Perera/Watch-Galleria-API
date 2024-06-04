import { z } from 'zod';
import mongoose from 'mongoose';

// Zod schema for order validation
export const OrderSchema = z.object({
    userEmail: z.string({ message: "User email is required" }),
    itemsList: z.object({}).optional(),
    totalPrice: z.number().optional(),
    status: z.enum(["CART", "COMPLETED"]).default("COMPLETED"),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
});

// Mongoose schema for Order
const orderMongooseSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    itemList: [
        {
            itemCode: { type: mongoose.Schema.Types.String, ref: 'Watch', required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true, min: 0 },
            image: { type: String },
        },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["CART", "COMPLETED"], default: "COMPLETED" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create Mongoose model
export const OrderModel = mongoose.model('Order', orderMongooseSchema);
