import React from 'react';
import useAuth from '../hooks/useAuth/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();


    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div>
                <progress className="progress w-56"></progress>
            </div>
        </div>;
    }
    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;