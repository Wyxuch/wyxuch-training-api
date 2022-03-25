import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import transactionApi from './router/transaction';
import { errorHandlerMiddleware } from './middleware/errorHandler';

const app = express();

const corsOptions = {
    origin: true,
};

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandlerMiddleware);
app.use(cors(corsOptions));

app.use('/transaction', transactionApi);

app.post('/', (req: Request, res: Response) => {
    res.send('test');
});

app.use((req, res) => {
    res.status(404).send('404');
});

export default app;