import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
// import './assets/css/app.min.css';
import './assets/css/app.css';


import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
