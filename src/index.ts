import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.router';
import { errorMiddleware } from './middlewares/errors'
import { SignupSchema } from './schema/users.schema';

const app: Express = express();
app.use(bodyParser.json());

app.use('/api/auth', authRouter);

export const prismaClient = new PrismaClient({
    log: ["query"],
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
