import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { useJobSeeker } from '../hooks/useJobSeeker';

const JobSeekerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isJobSeeker, jobSeekerLoading] = useJobSeeker(user?.email)
    const location = useLocation();
    
    if (loading && jobSeekerLoading) {
        return 'Loading....'
    }


    if (user && isJobSeeker) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace/>
};

export default JobSeekerRoute;