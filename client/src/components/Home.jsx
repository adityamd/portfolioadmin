import React, { useContext, useEffect, useState } from 'react'
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';

const Home = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [home, setHome] = useState(field.home)

  useEffect( () => {
      handleChange('home', home)
    }, [home])
  
  const handleChange1 = (e) => {
    setHome({
      ...home,
      [e.target.name]: e.target.value
    })
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Home" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            <table>
              <tr>
                <td>
                  <label htmlFor="text" className='label'>Text:</label>
                </td>
                <td>
                  <input type='text' name='text' placeholder='Text' value = {home.text} onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="name" className='label'>Name:</label>
                </td>
                <td>
                  <input type='text' name='name' placeholder='Name' value = {home.name} onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="post" className='label'>Post:</label>
                </td>
                <td>
                  <input type='text' name='post' placeholder='Post' value = {home.post} onChange={handleChange1} />
                </td>
              </tr>
            </table>
          </div>
      </div>
    </article>
  )
}

export default Home