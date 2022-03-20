import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import transactionApi from './router/transaction';
import bodyParser from 'body-parser';

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/transaction', transactionApi);

app.post('/', (req: Request, res: Response) => {
    res.send('test');
});

export default app;