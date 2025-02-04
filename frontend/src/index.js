import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './Routes/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResetPassword } from './Routes/ResetPassword';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
