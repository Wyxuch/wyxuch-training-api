import DefaultLayout from '../../layouts/DefaultLayout';
import './style.scss'
import { saveForm, useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Form, Formik } from 'formik';
import { TransactionForm } from '../../store/slices/transaction';
import { GenericInput, InputProps } from '../../components/form/GenericInput';
import { Button } from '../../components/button/Button';
import { validateCurrency, validateDate, validateId, validateNumber } from '../../components/form/validators';
import { useNavigate } from 'react-router-dom';

const inputs: Array<InputProps> = [
    {
        label: 'Date',
        name: 'date',
        placeholder: 'yyyy-MM-dd',
        validator: validateDate
    },
    {
        label: 'Amount',
        name: 'amount',
        type: 'number',
        placeholder: 'e.g. 123',
        validator: validateNumber
    },
    {
        label: 'Currency (short)',
        name: 'currency',
        placeholder: 'e.g. EUR',
        validator: validateCurrency
    },
    {
        label: 'Client ID',
        name: 'client_id',
        placeholder: 'e.g. 42',
        validator: validateId
    }
]

const ExchangeForm = () => {
    const initialValues = useAppSelector(state => state.transaction.transactionForm)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const onSubmit = (values: TransactionForm) => {
        dispatch(saveForm({
            client_id: values.client_id,
            amount: values.amount,
            date: values.date,
            currency: values.currency
        }))
        navigate('/res')
    }

    return (
        <DefaultLayout>
            <h1 className='header'>Currency Exchange Form</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched}) => (
                    <Form className={'form'}>
                        {inputs.map((props) => (
                            <GenericInput {...props} errors={errors} touched={touched}/>
                        ))}
                        <Button type="submit" label='Submit' wrapperClassName='wrapper-center'/>
                    </Form>
                    )}
                </Formik>
        </DefaultLayout>
    )
}

export default ExchangeForm