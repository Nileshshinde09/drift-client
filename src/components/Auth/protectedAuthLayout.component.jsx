import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loading } from '@/components'  // Adjust the path to match your project's structure

const ProtectedAuthLayout = ({ children, authentication = true }) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    const isEmailAuthenticated = useSelector(state => state.auth.isEmailAuthenticated)
    console.log(isEmailAuthenticated);
    
    useEffect(() => {
        if (authentication) {
            // For routes that require authentication
            if (!isEmailAuthenticated && authStatus) {
                navigate('/OTP')
            }
            if (!authStatus) {
                navigate('/login')
            } 
        } else {
            // For routes that do not require authentication (e.g., login, signup)
            if (authStatus && isEmailAuthenticated) {
                navigate('/')
            }
            if (authStatus && !isEmailAuthenticated) {
                navigate('/OTP')
            }
        }
        setLoader(false)
    }, [authStatus, isEmailAuthenticated, authentication, navigate])

    return loader ? <h1><Loading /></h1> : <>{children}</>
}

export default ProtectedAuthLayout