import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './constants/routes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
      <Provider store={store}>
          <App />
      </Provider>
  );

  expect(getByText(/form/i)).toBeInTheDocument();
});
