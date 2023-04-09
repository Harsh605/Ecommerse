import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store.js';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>

  </React.StrictMode>
);

