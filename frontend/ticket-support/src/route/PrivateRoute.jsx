import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ Component }) => {
  const { role } = useAuth();

  return role === 'admin' ? <Component /> : <Navigate to="/NotFound" replace />;
};

export default PrivateRoute;