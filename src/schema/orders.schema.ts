import {z} from 'zod';
import mongoose from 'mongoose';


const OrderSchema = z.object({
    userId: z.string({ message: "User ID is required" }),
    items: z.array(
        z.object({
            watchId: z.string({ message: "Watch ID is required" }),
            quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
        })
    ),
    totalPrice: z.number().positive({ message: "Total price must be a positive number" }),
    status: z.enum(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]).default("PENDING"),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
});

// Convert Zod schema to Mongoose schema
const orderMongooseSchema = new mongoose.Schema({
    userEmail: { required: true },
    items: [
        {
            watchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Watch', required: true },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["CART", "COMPLETED"], default: "CART" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create Mongoose model
const Order = mongoose.model('Order', orderMongooseSchema);

module.exports = { Order };