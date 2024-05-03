import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NewContextProvider from './NewContext/NewContext'; // Renamed the imported NewContext component to avoid conflicts

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NewContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NewContextProvider>
);
