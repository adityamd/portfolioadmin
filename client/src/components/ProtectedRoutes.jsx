import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token === undefined || token === null){
            navigate('/login');
        }
    }, [])

    return (
        <Outlet />
    )
}

export default ProtectedRoutes