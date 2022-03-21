import { Commission, CommissionRule, Transaction } from '../types/transaction';
import { COMMISSION_RETURN_CURRENCY, LOWEST_DEFAULT_COMMISSION } from '../constants/transactions';
import { exchangeToEuro } from '../util/exchange';
import { HttpError } from '../errors/generic';

// It can be exported to other file if grows too big, for the sake of example I left it here.
const commissionRules: Array<CommissionRule> = [
    {
        description: 'Default commission',
        commission: {
            fixed: false,
            amount: 0.5
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
            // if (!isVipClient(clientId) {
            //     return false;
            // }
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
            // if (getClientMonthlyTurnover(clientId, date) < 1000) {
            //     return false;
            // }
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

    return {
        amount: Math.min(...possibleCommissions),
        currency: COMMISSION_RETURN_CURRENCY
    };
};
