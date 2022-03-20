import { Router, Request, Response } from 'express';
import { getCommission } from '../service/transaction';

const transactionApi = Router();

transactionApi.post('/', async (req: Request, res: Response) => {
    res.status(200).send(await getCommission(req.body));
});

export default transactionApi;