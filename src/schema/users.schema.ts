import mongoose from 'mongoose';
import { z } from 'zod';

// Define the Zod schemas for Signup and Login
 export const SignupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    name: z.string().min(1, { message: "Name is required" }),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

// Convert Zod schema to Mongoose schema
const userMongooseSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, required: true, minlength: 1 },
}, {
    timestamps: true
});

// Create Mongoose model
export const UserModel = mongoose.model('User', userMongooseSchema);
