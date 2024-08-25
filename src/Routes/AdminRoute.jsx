import React from 'react';
import useRole from '../customsHooks/useRole';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../component/LoadnigSpiner';

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole();
    if(isLoading) return <LoadingSpinner/>
    if(role === 'admin') return children;
    
    return <Navigate to='/dashboard' />
};

export default AdminRoute;