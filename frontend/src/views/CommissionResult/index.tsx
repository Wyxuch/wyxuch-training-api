import DefaultLayout from '../../layouts/DefaultLayout';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getCommissionApi } from '../../store/slices/transaction';
import './style.scss'

const CommissionResult = () => {
    const commission = useAppSelector(state => state.transaction.commission)
    const error = useAppSelector(state => state.transaction.error)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCommissionApi())
    }, [])

    return (
        <DefaultLayout>
            <h1 className='header'>Commission</h1>
            {error && (
                <p className='commission-error'>
                    {error}
                </p>
            ) || commission && (
                <div className='commission-wrapper'>
                    <h2>{'Last Commission:'}</h2>
                    <p className='commission'>
                        {`${commission.amount} ${commission.currency}`}
                    </p>
                </div>
            )}
        </DefaultLayout>
    )
}

export default CommissionResult