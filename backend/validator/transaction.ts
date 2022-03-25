import { Schema } from 'express-validator/check';

export const transactionSchema: Schema = {
    client_id: {
        notEmpty: true
    },
    amount: {
        isNumeric: true,
        toFloat: true,
    },
    currency: {
        isString: true,
        toUpperCase: true,
    },
    date: {
        isString: true,
        matches: {
            options: /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
            errorMessage: 'Date doesn\'t match pattern YYYY-MM-DD'
        }
    }
};