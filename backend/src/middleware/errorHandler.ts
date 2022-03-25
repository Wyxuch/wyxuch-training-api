import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/generic';

export const errorHandlerMiddleware = (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log('custom');
        const status = (err instanceof HttpError) ? err.status : 500;
        console.log(status, err.message);
        res.status(status).send({ errors: [{ msg: err.message }] });
    } else {
        console.log(err);
        next(err);
    }
};