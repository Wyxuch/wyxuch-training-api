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