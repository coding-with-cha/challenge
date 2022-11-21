import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { closeProject, getProjects } from '../slices/projectSlice'
import {Link} from 'react-router-dom'
import AddAdmin from './AddAdmin'

const Projects = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProjects())
  },[])

  const {loading, projectList, errors} = useSelector((state)=>state.project)

 
  return (
    <div className='projects'>
      {projectList && projectList.map(project=>(
        <div key={project._id} className="project">
          <h6>Title: {project.title}</h6>
          <h6>Description: {project.description}</h6> 
          <Link className='Link' to={`/AddAdmin/${project._id}`}>Add admin</Link><br/>
          <Link className='Link' to={`/ShowTasks/${project._id}`}>Show Tasks</Link><br/>   
          {project.close === true ? <h5>Project closed</h5> : 
                    <button onClick={()=>dispatch(closeProject({id:project._id}))}>Close</button> 
                  }
        </div> 
      ))}
    </div>
  )
}

export default Projects