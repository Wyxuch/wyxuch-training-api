import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/generic';

export const errorHandlerMiddleware = (err: Error | HttpError, req: Request, res: Response) => {
    if (err) {
        const status = (err instanceof HttpError) ? err.status : 500;
        console.log(status, err.stack);
        res.status(status).render('error', { error: err });
    }
};