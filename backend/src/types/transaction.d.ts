export interface Transaction {
    date: string;
    amount: number;
    currency: string;
    client_id: string;
}

export interface Commission {
    amount: number;
    currency: string;
}

export interface CommissionRuleProps {
    amount: number;
    clientId: string;
    date: Date;
}

export interface CommissionRule {
    commission: {
        fixed: boolean;
        amount: number;
    };
    description: string;
    getCommission: (props: CommissionRuleProps) => number | false;
}