import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import './src/index.css'; // optional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

