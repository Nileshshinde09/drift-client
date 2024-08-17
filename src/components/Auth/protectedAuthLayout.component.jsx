import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loading } from '@/components'  // Adjust the path to match your project's structure
import { useLocation } from 'react-router-dom'
const ProtectedAuthLayout = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const location = useLocation();  // Get the current location
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);
    const isEmailAuthenticated = useSelector(state => state.auth.isEmailAuthenticated);

    useEffect(() => {
        if (authentication) {
            // For routes that require authentication
            if (!isEmailAuthenticated && authStatus) {
                navigate('/OTP', { state: { from: location } });  // Store the original location
            } else if (!authStatus) {
                navigate('/login', { state: { from: location } });  // Store the original location
            }
        } else {
            // For routes that do not require authentication (e.g., login, signup)
            if (authStatus && isEmailAuthenticated) {
                const redirectTo = location.state?.from?.pathname || '/';
                navigate(redirectTo);  // Redirect to the original location or home
            } else if (authStatus && !isEmailAuthenticated) {
                navigate('/OTP');
            }
        }
        setLoader(false);
    }, [authStatus, isEmailAuthenticated, authentication, navigate, location]);

    return loader ? <h1><Loading /></h1> : <>{children}</>;
}

export default ProtectedAuthLayout;
