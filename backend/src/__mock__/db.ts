// I didn't add proper database cause it wasn't the purpose of this app, all the data will erase after ending the process

interface Transaction {
    date: Date;
    amount: number;
}

interface Store {
    [key: string]: {
        VIP: boolean;
        transactions: Array<Transaction>
    }
}

export class Db {
    store: Store;

    constructor(store: Store) {
        this.store = {
            ...store,
            42: {
                VIP: true,
                transactions: []
            }
        };
    }

    getUserById(uid: string) {
        return this.store[uid];
    }

    addTransaction(uid: string, transaction: Transaction) {
        if (!this.store[uid]) {
            this.store[uid] = {
                VIP: false,
                transactions: [transaction]
            };
        } else {
            this.store[uid].transactions.push(transaction);
        }
    }
}