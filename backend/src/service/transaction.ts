import { Commission, CommissionRule, Transaction } from '../types/transaction';
import { COMMISSION_RETURN_CURRENCY, LOWEST_DEFAULT_COMMISSION } from '../constants/transactions';
import { exchangeToEuro, moreEqualThanXTurnover } from '../util/exchange';
import { HttpError } from '../errors/generic';
import { Db } from '../__mock__/db';

export const DB = new Db({});

// It can be exported to other file if grows too big, for the sake of example I left it here.
const commissionRules: Array<CommissionRule> = [
    {
        description: 'Default commission',
        commission: {
            fixed: false,
            amount: 0.005
        },
        getCommission({ amount }) {
            const commission = amount * this.commission.amount;
            return (commission < LOWEST_DEFAULT_COMMISSION) ? LOWEST_DEFAULT_COMMISSION : commission;
        }
    },
    {
        description: 'VIP User',
        commission: {
            fixed: true,
            amount: 0.05
        },
        getCommission({ clientId }) {
            if (!DB.getUserById(clientId)?.VIP) {
                return false;
            }
            return this.commission.amount;
        }
    },
    {
        description: '1000 monthly turnover',
        commission: {
            fixed: true,
            amount: 0.03
        },
        getCommission({ clientId, date }) {
            if (!moreEqualThanXTurnover(clientId, date, 1000)) {
                return false;
            }
            return this.commission.amount;
        }
    },
];

export const getCommission = async (transaction: Transaction): Promise<Commission> => {
    console.log(`Get transaction commission for user: ${transaction.client_id}`);

    const commissionRuleProps = {
        amount: await exchangeToEuro(transaction.amount, transaction.currency),
        clientId: transaction.client_id,
        date: new Date(transaction.date)
    };

    const possibleCommissions: Array<number> = [];
    commissionRules.forEach((commissionRule) => {
        const commission = commissionRule.getCommission(commissionRuleProps);
        if (typeof commission === 'number' && !Number.isNaN(commission)) {
            possibleCommissions.push(commission);
        }
    });

    if (!possibleCommissions.length) {
        throw new HttpError(`Couldn't get commission for the client: ${transaction.client_id}`, 500);
    }

    const lowestAmount = Math.min(...possibleCommissions);
    DB.addTransaction(transaction.client_id, { date: new Date(transaction.date), amount: commissionRuleProps.amount });

    return {
        amount: Number(lowestAmount.toFixed(2)),
        currency: COMMISSION_RETURN_CURRENCY
    };
};
