import React, { useContext, useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';
import { toast } from 'react-toastify';

const Services = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [services, setServices] = useState(field.services)

  const addServices = (e) => {
    e.preventDefault();
    if(services.length == 6){
      toast.error("Maximum 6 services allowed!")
      return;
    }
    setServices([
      ...services,
      {
        title: '',
        desc: ''
      }
    ])
  }

  const deleteService = (e, idx) => {
    setServices([
      ...services.slice(0, idx),
      ...services.slice(idx+1)
    ])
  }

  useEffect( () => {
    handleChange('services', services)
  }, [services])

  const handleChange1 = (e, idx) => {
    setServices(
      services.map( (services, ind) => ind === idx ? {...services, [e.target.name]: e.target.value } : services )
    )
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Services" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            {
              services && services.map((service, idx) => (
                <div className="catButton">
                  <label htmlFor="title" className='label'>Title:</label>
                  <input type='text' name='title' placeholder='Title' value = {service.title} onChange={(e) => {handleChange1(e, idx)}} />
                  <label htmlFor="desc"  className='label'>Description:</label>
                  <input type='text' name='desc' placeholder='Description' value = {service.desc} onChange={(e) => {handleChange1(e, idx)}}  />
                  <a className='cursor' onClick={(e)=>deleteService(e, idx)}>
                    <MdDelete />
                  </a>
                </div>
              ))
            }
            <div className="container smallBtn">
              <button onClick = {addServices} 
              disabled = { services.length > 0 && (!services[services.length-1]?.title || !services[services.length-1]?.desc) }  >
                <MdAdd />
                Add
              </button>
            </div>
          </div>
      </div>
    </article>
    
  )
}

export default Services