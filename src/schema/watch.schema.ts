import {z} from 'zod';
import mongoose from 'mongoose';

// Define the Zod schema for Watch
export const WatchSchema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }).optional(),
    price: z.number().positive({ message: "Price is required" }),
    model: z.enum(["UNISEX", "MALE", "FEMALE"]),
    rating: z.number().int().positive({ message: "Rating is required" }).optional(),
    quantity: z.number().int().positive({ message: "Quantity is required" }),
    imageUrlList: z.array(z.string().url()).optional(),
});

// Convert Zod schema to Mongoose schema
const watchMongooseSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    model: { type: String, enum: ["UNISEX", "MALE", "FEMALE"], required: true },
    rating: { type: Number, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    imageUrlList: { type: [String] },
});

// Create Mongoose model
export const WatchModel = mongoose.model('Watch', watchMongooseSchema);
