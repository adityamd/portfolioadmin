import React, { useContext, useEffect, useState } from 'react'
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';

const Contact = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [contact, setContact] = useState(field.contact)

  useEffect( () => {
      handleChange('contact', contact)
    }, [contact])
  
  const handleChange1 = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    })
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Contact" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            <table>
              <tr>
                <td>
                  <label htmlFor="addr1" className='label'>Address description:</label>
                </td>
                <td>
                  <input type='text' name='addr1' placeholder='Address description' value = {contact.addr1} onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="addr2" className='label'>Address description (contd.):</label>
                </td>
                <td>
                  <input type='text' name='addr2' placeholder='Address description (cntd)' value = {contact.addr2} onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="phone1" className='label'>Phone number 1:</label>
                </td>
                <td>
                  <input type='phone' name='phone1' placeholder='Phone number 1' value = {contact.phone1} onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="phone2" className='label'>Phone number 2:</label>
                </td>
                <td>
                  <input type='text' name='phone2' placeholder='Phone number 2' value = {contact.phone2} onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email1" className='label'>Email Id 1:</label>
                </td>
                <td>
                  <input type='email' name='email1' placeholder='Email Id 1' value = {contact.email1} onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email2" className='label'>Email Id 2:</label>
                </td>
                <td>
                  <input type='email' name='email2' placeholder='Email Id 2' value = {contact.email2} onChange={handleChange1} />
                </td>
              </tr>
            </table>
          </div>
      </div>
    </article>
  )
}


export default Contact