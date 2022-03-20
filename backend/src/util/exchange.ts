import axios from 'axios';
import { HttpError } from '../errors/generic';

export interface Motd {
    msg: string;
    url: string;
}
export interface Rates {
    [key: string]: number;
}
export interface ExchangeApiResponse {
    motd: Motd;
    success: boolean;
    historical: boolean;
    base: string;
    date: string;
    rates: Rates;
}

export const exchangeToEuro = async (amount: number, currency: string): Promise<number> => {
    if (currency.toLowerCase() === 'eur') {
        return amount;
    }

    const apiUrl = process.env.EXCHANGE_API_URL;

    if (!apiUrl) {
        throw new HttpError('Missing exchange API URL', 500);
    }

    try {
        const rate = await axios
            .get<ExchangeApiResponse>(apiUrl)
            .then((res) => {
                console.log(`Exchange API statusCode: ${res.status}`);

                if (!res.data.success) {
                    console.error('Exchange API internal error');
                    throw new HttpError('Exchange API internal error', 500);
                }

                return res.data.rates[currency];
            });

        if (!rate) {
            console.error(`No such currency ${currency}`);
            throw new HttpError(`No such currency ${currency}`, 500);
        }

        return amount / rate;
    } catch (e) {
        console.error(e);
        throw new HttpError(`Exchange API error:\n${e}`, 500);
    }
};