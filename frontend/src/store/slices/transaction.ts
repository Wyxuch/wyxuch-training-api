import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Commission } from '../../types/transaction';
import { postCommissionApi } from '../../api/transactionApi';
import { RootState } from '../store';

export interface TransactionForm {
    date: string;
    client_id: string;
    amount: string;
    currency: string;
}

interface InitialState {
    transactionForm: TransactionForm;
    commission: Commission | undefined;
    error: string | undefined;
}

export const getCommissionApi = createAsyncThunk<Commission, void, {state: RootState, rejectValue: string }>(
    'transactions/getCommission',
    async (_, {getState, rejectWithValue}) => {
        const { transaction }  = getState()
        const response = await postCommissionApi(transaction.transactionForm)
        if (response.status !== 200) {
            if (response.status === 400) {
                return rejectWithValue('Please check if form is completed properly')
            } else {
                return rejectWithValue(response.statusText)
            }
        } else {
            return response.data
        }
    }
)

export const initialState: InitialState = {
    transactionForm: {
        date: '',
        client_id: '',
        amount: '',
        currency: ''
    },
    error: undefined,
    commission: undefined,
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        saveForm: (state: InitialState, action: PayloadAction<TransactionForm>) => {
            state.transactionForm = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCommissionApi.fulfilled, (state, action) => {
            state.commission = action.payload
            state.error = undefined
        })
        builder.addCase(getCommissionApi.rejected, (state, action) => {
            state.error = action.payload
        })
    },
})

export const transactionReducer = transactionSlice.reducer