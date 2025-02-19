import React, { useContext, useEffect, useState } from 'react'
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';
import { FaExternalLinkAlt } from "react-icons/fa";

const Social = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [social, setSocial] = useState(field.social)

  useEffect( () => {
      handleChange('social', social)
    }, [social])
  
  const handleChange1 = (e) => {
    setSocial({
      ...social,
      [e.target.name]: e.target.value
    })
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Social" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            <table>
              <tr>
                <td>
                  <label htmlFor="linkedin" className='label'>Linkedin:</label>
                </td>
                <td>
                  <input type='text' name='linkedin' placeholder='Linkedin link' value = {social.linkedin} onChange={handleChange1} />
                </td>
                <td>
                  <a href={social.facebook} target='_blank' className='cursor'>
                    <FaExternalLinkAlt />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="twitter" className='label'>Twitter:</label>
                </td>
                <td>
                  <input type='text' name='twitter' placeholder='Twitter link' value = {social.twitter} onChange={handleChange1} />
                </td>
                <td>
                  <a href={social.twitter} target='_blank' className='cursor'>
                    <FaExternalLinkAlt />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="instagram" className='label'>Instagram:</label>
                </td>
                <td>
                  <input type='text' name='instagram' placeholder='Instagram link' value = {social.instagram} onChange={handleChange1} />
                </td>
                <td>
                  <a href={social.instagram} target='_blank' className='cursor'>
                    <FaExternalLinkAlt />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="youtube" className='label'>Youtube:</label>
                </td>
                <td>
                  <input type='text' name='youtube' placeholder='Youtube link' value = {social.youtube} onChange={handleChange1} />
                </td>
                <td>
                  <a href={social.youtube} target='_blank' className='cursor'>
                    <FaExternalLinkAlt />
                  </a>
                </td>
              </tr>
            </table>
          </div>
      </div>
    </article>
  )
}

export default Social