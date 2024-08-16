import React from 'react';
import useAuth from '../customsHooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading) return <span className="loading loading-spinner loading-lg"></span>
    if(user) return children;


    return <Navigate to='/login' state={location.pathname} replace='true' />
};

export default PrivateRoute;