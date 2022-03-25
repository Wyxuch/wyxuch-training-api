import {
    Router, Request, Response, NextFunction
} from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { getCommission } from '../service/transaction';
import { Commission } from '../types/transaction';
import { transactionSchema } from '../../validator/transaction';

const transactionApi = Router();

transactionApi.post('/', checkSchema(transactionSchema), async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    return Promise.resolve(getCommission(req.body)).then((commission: Commission) => res.status(200).send(commission)).catch(next);
});

export default transactionApi;