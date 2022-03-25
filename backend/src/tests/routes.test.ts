import request from 'supertest';
import app from '../app';

import { Transaction } from '../types/transaction';

const sampleTransactions = [
    {
        transaction: {
            amount: 1,
            currency: 'EUR',
            client_id: '4222',
            date: '2022-02-02'
        },
        commission: {
            currency: 'EUR',
            amount: 0.05
        }
    },
    {
        transaction: {
            amount: 111111,
            currency: 'EUR',
            client_id: '42',
            date: '2022-02-02'
        },
        commission: {
            currency: 'EUR',
            amount: 0.05
        }
    },
    {
        transaction: {
            amount: 100000,
            currency: 'EUR',
            client_id: 'test',
            date: '2012-12-12'
        },
        commission: {
            currency: 'EUR',
            amount: 500
        }
    },
    {
        transaction: {
            amount: 100,
            currency: 'EUR',
            client_id: 'test',
            date: '2012-12-12'
        },
        commission: {
            currency: 'EUR',
            amount: 0.03
        }
    }
];

const brokenTransactions = [
    {
        amount: 1,
        currency: 'EUR',
        client_id: '4222',
        date: '2022-22-02'
    },
    {
        amount: 0.05,
        currency: 'EUR',
        client_id: () => 'test',
        date: '2022-02-02'
    },
    {
        amount: 'a',
        currency: 'EUR',
        client_id: '4222',
        date: '2022-02-02'
    },
    {
        amount: 1,
    }
];

describe('server-routes', () => {
    sampleTransactions.forEach((transaction) => {
        it(`POST /transaction/ - success ${JSON.stringify(transaction)}`, async () => {
            const { body } = await request(app).post('/transaction/').send(transaction.transaction); //use the request function that we can use the app// save the response to body variable
            expect(body).toEqual(transaction.commission);
        });
    });
    brokenTransactions.forEach((transaction) => {
        it(`POST /transaction/ - wrong body ${JSON.stringify(transaction)}`, async () => {
            const response = await request(app).post('/transaction/').send(transaction); //use the request function that we can use the app// save the response to body variable
            expect(response.status).toEqual(400);
        });
    });
    it('POST 404', async () => {
        const response = await request(app).post('/transactions/').send({}); //use the request function that we can use the app// save the response to body variable
        expect(response.status).toEqual(404);
    });
});