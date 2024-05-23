import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import rootRouter from './routes/routes';

const app: Express = express();
app.use(bodyParser.json());
app.use('/api', rootRouter);

// Initialize the Prisma client
export const prismaClient = new PrismaClient({
    log: ["query"],
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
