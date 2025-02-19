import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    useEffect( () => {
        const token = localStorage.getItem('token')
        if(token !== undefined && token !== null){
            navigate('/')
        }    
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData)
    }

    const login = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('/login', formData);
            await localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch(error){
            toast.error("Invalid credentials")
        }
    }

    return (
        <div className="login-container">
            <Heading title="Portfolio Admin App Login" />
            <div className="card">
                <form className="contact">
                    <label htmlFor="username">Username:</label>
                    <input type="text" name = "username" value = {formData.username} onChange={handleChange} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name = "password" value = {formData.password} onChange={handleChange} />
                    <div className="container smallBtn">
                        <button onClick={login}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login