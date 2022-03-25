import axios, { AxiosResponse } from 'axios';
import { Commission } from '../types/transaction';
import { TransactionForm } from '../store/slices/transaction';

export const postCommissionApi = (transactionForm: TransactionForm) => {
    if (!process.env.REACT_APP_BACKEND_URL) {
        throw new Error('Please ensure you added environmental variables')
    }
    console.log(transactionForm)
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}transaction`, transactionForm)
        .then(function (response: AxiosResponse<Commission>) {
            return response;
        })
        .catch(function (error) {
           return error.response
        });
}