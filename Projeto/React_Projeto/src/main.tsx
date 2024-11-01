import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css' //npm i bootstrap@latest
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext.tsx';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(

  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);