import express, {Express} from 'express';
import {PrismaClient} from '@prisma/client';
import bodyParser from 'body-parser';
import authRoutes from './routes/custom/auth.routes';
import watchRoutes from './routes/custom/watch.routes';
import {errorMiddleware} from './middlewares/errors'
import {authMiddleware} from "./middlewares/auth.middleware";

const app: Express = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/watch',authMiddleware, watchRoutes);

export const prismaClient:PrismaClient = new PrismaClient({
    log: ["query"],
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
