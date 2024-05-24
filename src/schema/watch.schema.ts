import {z} from "zod";

export const WatchSchema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }).optional(),
    price: z.number().positive({ message: "Price is required" }),
    model: z.enum(["UNISEX", "MALE", "FEMALE"]),
    rating: z.number().int().positive({ message: "Rating is required" }).optional(),
    quantity: z.number().int().positive({ message: "Quantity is required" }),
    imageUrlList: z.any().optional(),
});