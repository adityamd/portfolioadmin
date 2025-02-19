import React, { useContext, useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';
import { sendImage } from './common';

const Portfolio = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [portfolios, setPortfolio] = useState(field.portfolio)

  const addPortfolio = (e) => {
    e.preventDefault();
    setPortfolio([
      ...portfolios,
      {
        title: '',
        name: '',
        category: 'development'
      }
    ])
  }

  const deletePortfolio = (e, idx) => {
    setPortfolio([
      ...portfolios.slice(0, idx),
      ...portfolios.slice(idx+1)
    ])
  }

  useEffect( () => {
    handleChange('portfolio', portfolios)
  }, [portfolios])

  const handleChange1 = (e, idx) => {
    setPortfolio(
      portfolios.map( (portfolio, ind) => ind === idx ? {...portfolio, [e.target.name]: e.target.value } : portfolio )
    )
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Portfolio" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            {
              portfolios && portfolios.map((portfolio, idx) => (
                  <div className="flex">
                    <div className="card">
                    <div className="catButton">
                      <label htmlFor="name"  className='label'>Name:</label>
                      <input type='text' name='name' placeholder='Name' value = {portfolio.name} onChange={(e) => {handleChange1(e, idx)}}  />
                      <label htmlFor="title" className='label'>Title:</label>
                      <input type='text' name='title' placeholder='Title' value = {portfolio.title} onChange={(e) => {handleChange1(e, idx)}} />
                    </div>
                    <div>
                      <label htmlFor="category"  className='label'>Category:</label>
                      <select name="category">
                        <option value="development" selected={portfolio.category === 'development'} >Development</option>
                        <option value="design" selected={portfolio.category === 'design'}>Design</option>
                        <option value="marketing" selected={portfolio.category === 'marketing'}>Marketing</option>
                      </select> <br />
                      <label htmlFor="cover" className='label'>Cover Image:</label>
                      <input type='file' name='cover' accept='.jpg,.jpeg,.png,.gif,.svg,.webp' filename={portfolio.cover} onChange={(e) => sendImage(e, encodeURIComponent(`port/port${idx}.jpg`))} />
                    </div>
                  </div>
                  <a className='cursor' onClick={(e)=>deletePortfolio(e, idx)}>
                    <MdCancel />
                  </a>
                </div>
              ))
            }
            <div className="container smallBtn">
              <button onClick = {addPortfolio} 
              disabled = { portfolios.length > 0 && (!portfolios[portfolios.length-1]?.title || !portfolios[portfolios.length-1]?.name
                || !portfolios[portfolios.length-1]?.category  || !portfolios[portfolios.length-1]?.cover
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

export default Portfolio