import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { transactionReducer } from './slices/transaction';

export const store = configureStore({
  reducer: {
    transaction: transactionReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: ""
    }
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
