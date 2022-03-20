import { Commission, Transaction } from '../types/transaction';
import { getCommission } from '../service/transaction';

export const transactionCommission = async (transaction: Transaction): Promise<Commission> => getCommission(transaction);