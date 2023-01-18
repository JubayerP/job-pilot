import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useEmployer } from '../hooks/useEmployer';

const EmployerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isEmployer, employerLoading] = useEmployer(user?.email)
    const location = useLocation();

    console.log('inside eroute', isEmployer);
    
    if (loading || employerLoading) {
        return 'Loading....'
    }


    if (user && isEmployer) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace/>
};

export default EmployerRoute;