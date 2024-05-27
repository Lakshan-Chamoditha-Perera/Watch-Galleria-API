import express, { Express } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/custom/auth.routes';
import watchRoutes from './routes/custom/watch.routes';
import { errorMiddleware } from './middlewares/errors'
import { authMiddleware } from "./middlewares/auth.middleware";
const mongoose = require('mongoose')

const app: Express = express();

app.use(bodyParser.json());
app.use(errorMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/watch', authMiddleware, watchRoutes);


const url = process.env.DATABASE_URI;
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
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

