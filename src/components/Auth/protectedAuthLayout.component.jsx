import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Protected = ({ children, authentication = true }) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
 
    
    const authStatus = useSelector(state => state.auth.status)
    const isEmailAuthenticated  = useSelector( state => state.auth.isEmailAuthenticated )
    
    useEffect(() => 
    {   
        // if (authentication && authStatus !== authentication) navigate("/login")
        // else if (!authentication && authStatus !== authentication && !isEmailAuthenticated) navigate("/OTP")
        // else if (!authentication && authStatus !== authentication) navigate("/")
        // if (!authStatus) navigate("/login") 
        // else if(authStatus && !isEmailAuthenticated) navigate('/OTP')
        // else if(authStatus && isEmailAuthenticated) navigate('/')
        setLoader(false)
    }, 
    [
        authStatus,
        navigate,
        authentication,
        isEmailAuthenticated
    ])

    return loader ?
     <h1>Loading...</h1> :
     <>{children}</>
}

export default Protected;
