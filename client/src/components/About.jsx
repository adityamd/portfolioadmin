import React, { useContext, useEffect, useState } from 'react'
import Heading from './Heading'
import { sendImage } from './common';
import { FieldContext } from '../context/FieldContext';

const About = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [about, setAbout] = useState(field.about)    

  useEffect( () => {
      handleChange('about', about)
    }, [about])
  
  const handleChange1 = (e) => {
    setAbout({
      ...about,
      [e.target.name]: e.target.value
    })
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="About" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            <table>
              <tr>
                <td>
                  <label htmlFor="desc" className='label'>Description:</label>
                </td>
                <td>
                  <textarea name='desc' placeholder='Description' value = {about.desc} rows="4" cols="50" onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="desc1" className='label'>Additional description:</label>
                </td>
                <td>
                  <textarea  name='desc1' placeholder='Some more description...' value = {about.desc1} rows="4" cols="50" onChange={handleChange1} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cover" className='label'>Cover Image:</label>
                </td>
                <td>
                  <input type='file' name='cover' accept='.jpg,.jpeg,.png,.gif,.svg,.webp' filename={about.cover} onChange={(e) => sendImage(e, 'about.jpg')} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="cv" className='label'>Resume (only .pdf):</label>
                </td>
                <td>
                  <input type='file' name='cv' accept='.pdf' filename={about.cv} onChange={(e) => {sendImage(e, encodeURIComponent('Aditya-Resume.pdf'))}} />
                </td>
              </tr>
            </table>
          </div>
      </div>
    </article>
  )
}

export default About