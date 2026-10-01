import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/components.css';
import './styles/tokens.css';
import { BasketProvider } from './state/BasketContext.jsx';
import { TypeProvider } from './state/TypeContext.jsx';
import { BackgroundProvider } from './state/BackgroundContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <TypeProvider>
        <BackgroundProvider>
            <BasketProvider>
                <App />
            </BasketProvider>
        </BackgroundProvider>
      </TypeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
