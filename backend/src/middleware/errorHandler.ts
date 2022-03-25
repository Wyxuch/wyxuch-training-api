import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/generic';

export const errorHandlerMiddleware = (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        const status = (err instanceof HttpError) ? err.status : 500;
        console.log(status, err.stack);
        res.status(status).render('error', { error: err });
    } else {
        console.log(err);
        next(err);
    }
};