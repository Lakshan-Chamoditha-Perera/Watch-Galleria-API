import express, { Express } from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/custom/auth.routes';
import watchRoutes from './routes/custom/watch.routes';
import userRoutes from "./routes/custom/user.routes";

import { authMiddleware } from "./middlewares/auth.middleware";
dotenv.config();

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/watch',  watchRoutes);
app.use('/api/user', userRoutes);

const url = process.env.DATABASE_URI||"";
mongoose.connect(url)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err: any) => {
        console.error(`Error connecting to the database. n${err}`);
    })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});