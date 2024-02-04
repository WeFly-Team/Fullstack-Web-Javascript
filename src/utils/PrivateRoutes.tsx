import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoutes(): React.JSX.Element {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
}
