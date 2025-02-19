import React, { useContext, useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';

const Navlinks = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [navLinks, setNavLinks] = useState(field.navLinks)

  const addNavLink = (e) => {
    e.preventDefault();
    setNavLinks([
      ...navLinks,
      {
        url: '',
        text: ''
      }
    ])
  }

  const deleteLink = (e, idx) => {
    setNavLinks([
      ...navLinks.slice(0, idx),
      ...navLinks.slice(idx+1)
    ])
  }

  useEffect( () => {
    handleChange('navLinks', navLinks)
  }, [navLinks])

  const handleChange1 = (e, idx) => {
    setNavLinks(
      navLinks.map( (navLink, ind) => ind === idx ? {...navLink, [e.target.name]: e.target.value } : navLink )
    )
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Navlinks" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            {
              navLinks && navLinks.map((navLink, idx) => (
                <div className="catButton">
                  <label htmlFor="text" className='label'>Text:</label>
                  <input type='text' name='text' placeholder='Text' value = {navLink.text} onChange={(e) => {handleChange1(e, idx)}} />
                  <label htmlFor="URL"  className='label'>URL:</label>
                  <input type='text' name='url' placeholder='URL' value = {navLink.url} onChange={(e) => {handleChange1(e, idx)}}  />
                  <a className='cursor' onClick={(e)=>deleteLink(e, idx)}>
                    <MdDelete />
                  </a>
                </div>
              ))
            }
            <div className="container smallBtn">
              <button onClick = {addNavLink} 
              disabled = { navLinks && navLinks.length > 0 && (!navLinks[navLinks.length-1]?.url || !navLinks[navLinks.length-1]?.text) }  >
                <MdAdd />
                Add
              </button>
            </div>
          </div>
      </div>
    </article>
    
  )
}

export default Navlinks