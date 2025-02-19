import React, { useContext, useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Heading from './Heading'
import { FieldContext } from '../context/FieldContext';
import { toast } from 'react-toastify';

const Project = () => {

  const { field, handleChange } = useContext(FieldContext)
  const [projects, setProjects] = useState(field.projects)

  const addProjects = (e) => {
    e.preventDefault();
    if(projects.length == 4){
      toast.error("Maximum 4 projects allowed!")
      return;
    }
    setProjects([
      ...projects,
      {
        title: '',
        num: ''
      }
    ])
  }

  const deleteProject = (e, idx) => {
    setProjects([
      ...projects.slice(0, idx),
      ...projects.slice(idx+1)
    ])
  }

  useEffect( () => {
    handleChange('projects', projects)
  }, [projects])

  const handleChange1 = (e, idx) => {
    setProjects(
      projects.map( (projects, ind) => ind === idx ? {...projects, [e.target.name]: e.target.value } : projects )
    )
  }

  return (
    <article>
      <div className='container flexsb'>
          <Heading title="Projects" />
          <div className="border-left" style={{flexBasis: '50%'}}>
            {
              projects && projects.map((project, idx) => (
                <div className="catButton">
                  <label htmlFor="title" className='label'>Title:</label>
                  <input type='text' name='title' placeholder='Title' value = {project.title} onChange={(e) => {handleChange1(e, idx)}} />
                  <label htmlFor="num"  className='label'>Number:</label>
                  <input type='number' name='num' placeholder='Number' value = {project.num} onChange={(e) => {handleChange1(e, idx)}}  />
                  <a className='cursor' onClick={(e)=>deleteProject(e, idx)}>
                    <MdDelete />
                  </a>
                </div>
              ))
            }
            <div className="container smallBtn">
              <button onClick = {addProjects} 
              disabled = { projects.length > 0 && (!projects[projects.length-1]?.title || !projects[projects.length-1]?.num) }  >
                <MdAdd />
                Add
              </button>
            </div>
          </div>
      </div>
    </article>
    
  )
}

export default Project