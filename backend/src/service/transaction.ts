import { Commission, Transaction } from '../types/transaction';
import { COMMISSION_RETURN_CURRENCY } from '../constants/transactions';
import { exchangeToEuro } from '../util/exchange';

export const getCommission = async (transaction: Transaction): Promise<Commission> => {
    console.log(`Get transaction commission for user: ${transaction.client_id}`);
    return {
        amount: await exchangeToEuro(transaction.amount, transaction.currency),
        currency: COMMISSION_RETURN_CURRENCY
    };
};