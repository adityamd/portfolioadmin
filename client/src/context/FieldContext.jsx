import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const API_URL = '/api/field'

const initialState = {
    fields: []
}

export const FieldContext = createContext(initialState)

export const FieldProvider = ({ children }) => {

    const [field, setField] = useState({
        navlink: [],
        home: [],
        about: [],
        services: [],
        project: [],
        portfolio: [],
        testimonials: [],
        blog: [],
        contact: [],
        social: []
    })

    const [isLoading, setIsLoading] = useState(false);

    const [id, setId] = useState()
    
    const getData = async () => {
        if(!id){
            setIsLoading(true);
            const data = await axios.get(API_URL);
            setId(data.data[0]._id);
            setField(data.data[0].allFields);
            setIsLoading(false);
            console.log(data.data[0])
        }
    }

    const updateData = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newField = {
            allFields: field
        }
        const data = await axios.put(`${API_URL}/${id}`, newField)
        setIsLoading(false)
        if(data.status === 201){
            toast.success('Fields updated successfully')
        } else{
            toast.error('Error saving fields: '+ data.data.message)
        }
    }
    
    const handleChange = async (name, value) => {
        setField({
            ...field,
            [name]: value
        }
        )
    }

    const contextValues = {
        field: field,
        getData,
        updateData,
        handleChange
    }

    return (
        <FieldContext.Provider value = {contextValues}>
            {
                isLoading ? 
                <Spinner /> :
                children
            }
        </FieldContext.Provider>
    )
}