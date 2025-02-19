import React, { useContext, useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';
import { sendImage } from './common';

const Blog = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [blogs, setBlog] = useState(field.blogs)

  const addBlog = (e) => {
    e.preventDefault();
    setBlog([
      ...blogs,
      {
        title: '',
        date: new Date().getDate(),
        author: '',
        desc: ''
      }
    ])
  }

  const deleteBlog = (e, idx) => {
    setBlog([
      ...blogs.slice(0, idx),
      ...blogs.slice(idx+1)
    ])
  }

  useEffect( () => {
    handleChange('blogs', blogs)
  }, [blogs])

  const handleChange1 = (e, idx) => {
    setBlog(
      blogs.map( (blog, ind) => ind === idx ? {...blog, [e.target.name]: e.target.value } : blog )
    )
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Blog" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            {
              blogs && blogs.map((blog, idx) => (
                <div className="flex">
                  <div className="card">
                    <label htmlFor="title"  className='label'>Title:</label>
                    <input type='text' name='title' placeholder='Title' value = {blog.title} onChange={(e) => {handleChange1(e, idx)}}  />
                    <label htmlFor="desc" className='label'>Description:</label>
                    <textarea name='desc' placeholder='Description' value = {blog.desc} onChange={(e) => {handleChange1(e, idx)}} />
                    <label htmlFor="author" className='label'>Author:</label>
                    <input type='text' name='authot' placeholder='Author' value = {blog.author} onChange={(e) => {handleChange1(e, idx)}} />
                    <label htmlFor="date"  className='label'>Date:</label>
                    <input type='date' name='date' placeholder='Date' value = {blog.date} onChange={(e) => {handleChange1(e, idx)}}  />
                    <label htmlFor="cover" className='label'>Cover Image:</label>
                    <input type='file' name='cover' accept='.jpg,.jpeg,.png,.gif,.svg,.webp' filename={blog.cover} onChange={(e) => sendImage(e, encodeURIComponent(`blog/b${idx}.jpg`))} />
                  </div>
                  <a className='cursor' onClick={(e)=>deleteBlog(e, idx)}>
                    <MdCancel />
                  </a>
                </div>
              ))
            }
            <div className="container smallBtn">
              <button onClick = {addBlog} 
              disabled = { blogs && blogs.length > 0 && (!blogs[blogs.length-1]?.title || !blogs[blogs.length-1]?.desc || !blogs[blogs.length-1]?.author
                || !blogs[blogs.length-1]?.date  || !blogs[blogs.length-1]?.cover
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


export default Blog