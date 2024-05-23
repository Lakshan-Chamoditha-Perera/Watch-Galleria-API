import express, {Express} from 'express';
import {PrismaClient} from '@prisma/client';
import bodyParser from 'body-parser';
import authRoutes from './routes/custom/auth.routes';
import itemRoutes from './routes/custom/item.routes';
import {errorMiddleware} from './middlewares/errors'

const app: Express = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

export const prismaClient:PrismaClient = new PrismaClient({
    log: ["query"],
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
