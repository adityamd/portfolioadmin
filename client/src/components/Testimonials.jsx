import React, { useContext, useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';
import { sendImage } from './common';

const Testimonials = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [testimonials, setTestimonial] = useState(field.testimonials)

  const addTestimonial = (e) => {
    e.preventDefault();
    setTestimonial([
      ...testimonials,
      {
        text: '',
        name: '',
        post: ''
      }
    ])
  }

  const deleteTestimonial = (e, idx) => {
    setTestimonial([
      ...testimonials.slice(0, idx),
      ...testimonials.slice(idx+1)
    ])
  }

  useEffect( () => {
    handleChange('testimonial', testimonials)
  }, [testimonials])

  const handleChange1 = (e, idx) => {
    setTestimonial(
      testimonials.map( (testimonial, ind) => ind === idx ? {...testimonial, [e.target.name]: e.target.value } : testimonial )
    )
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Testimonial" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            {
              testimonials && testimonials.map((testimonial, idx) => (
                <div className="flex">
                  <div className="card">
                    <label htmlFor="name"  className='label'>Name:</label>
                    <input type='text' name='name' placeholder='Name' value = {testimonial.name} onChange={(e) => {handleChange1(e, idx)}}  />
                    <label htmlFor="text" className='label'>Text:</label>
                    <textarea name='text' placeholder='Text' value = {testimonial.text} onChange={(e) => {handleChange1(e, idx)}} />
                    <label htmlFor="post" className='label'>Post:</label>
                    <input type='text' name='post' placeholder='Post' value = {testimonial.post} onChange={(e) => {handleChange1(e, idx)}} />
                    <label htmlFor="image" className='label'>Profile Image:</label>
                    <input type='file' name='image' accept='.jpg,.jpeg,.png,.gif,.svg,.webp' filename={testimonial.image} onChange={(e) => sendImage(e, encodeURIComponent(`testimonials/team-${idx}.jpg`))} />
                  </div>
                  <a className='cursor' onClick={(e)=>deleteTestimonial(e, idx)}>
                    <MdCancel />
                  </a>
                </div>
              ))
            }
            <div className="container smallBtn">
              <button onClick = {addTestimonial} 
              disabled = { testimonials.length > 0 && (!testimonials[testimonials.length-1]?.text || !testimonials[testimonials.length-1]?.name
                || !testimonials[testimonials.length-1]?.image  || !testimonials[testimonials.length-1]?.post
              ) }  >
                <MdAdd />
                Add
              </button>
            </div>
          </div>
      </div>
    </article>
  )
}


export default Testimonials