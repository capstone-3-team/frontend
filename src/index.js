import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
require('dotenv').config();
root.render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
);
