import { render } from '@testing-library/react';
import React from 'react';
import { Button } from './Button';

test('renders button', () => {
    const { getByText } = render(
        <Button label={'button'} />
    );

    expect(getByText(/button/i)).toBeInTheDocument();
});