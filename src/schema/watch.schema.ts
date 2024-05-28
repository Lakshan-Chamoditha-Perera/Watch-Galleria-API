import {z} from 'zod';
import mongoose from 'mongoose';

export const WatchSchema = z.object({
    itemCode: z.string().min(3),
    productName: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(["LUXURY", "SPORT", "CASUAL","SMART"]),
    price: z.number().min(0),
    quantity: z.number().min(0),
    rating: z.number().min(0).optional(),
    productDate: z.any(),
    gender: z.enum(["UNISEX", "MALE","FEMALE"]),
    imageUrlList: z.array(z.string()).optional(),
});

export const watchMongooseSchema = new mongoose.Schema({
    itemCode: { type: String, required: true, minlength: 3 },
    productName: { type: String },
    description: { type: String },
    category: { type: String, enum: ["LUXURY", "SPORT", "CASUAL","SMART"], required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    rating: { type: Number, min: 0 },
    productDate: { type: Date, default: Date.now },
    gender: { type: String, enum: ["UNISEX", "MALE","FEMALE"], required: true },
    imageUrlList: { type: [String] },
});

// Create Mongoose model
export const WatchModel = mongoose.model('Watch', watchMongooseSchema);
