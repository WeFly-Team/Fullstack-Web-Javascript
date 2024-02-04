import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './routes/routes';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="785790667634-1r362pmk4q48l0j2i0vcl3v6nfesn60m.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
