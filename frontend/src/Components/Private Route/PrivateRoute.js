import React, { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = () => {

  const { isAuthenticated, loading } = useContext(AuthContext)
  const location = useLocation();

  console.log(isAuthenticated, loading);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (

    (isAuthenticated) ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />
  );

};

export default PrivateRoute;
