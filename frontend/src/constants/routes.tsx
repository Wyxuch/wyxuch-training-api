import ExchangeForm from '../views/ExchangeForm';
import CommissionResult from '../views/CommissionResult';

interface Route {
    path: string,
    displayName: string,
    element: JSX.Element
}

export const routes: Array<Route> =
    [
        {
            path: '/',
            displayName: 'Form',
            element: <ExchangeForm />
        },
        {
            path: '/res',
            displayName: 'Result',
            element: <CommissionResult />
        }
]