import React, { useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getallUsers, managerUpListProjectUser } from '../slices/userSlice'
import { useParams } from 'react-router-dom'
import { managerUpAdminListProject } from '../slices/projectSlice'
import { useNavigate } from "react-router-dom";
import { getTasksIdProject } from '../slices/taskSlice'

const ShowTasks = () => {
    const {projectId} = useParams();
    const dispatch = useDispatch()
  

    useEffect(()=>{
      dispatch(getTasksIdProject(projectId))
    },[])
  
    const {loading, taskList, errors} = useSelector((state)=>state.task)
    
  return ( 
    <div className='projects'>      
        {taskList && taskList.map(task=>(
            <div key={task._id} className="project">
                <h6>Title: {task.title}</h6>
                <h6>Description: {task.description}</h6>
                <button style={{width:"60px", high:"60px"}}><img src='https://cdn-icons-png.flaticon.com/512/8964/8964926.png' style={{width:"30px", high:"30px"}}/></button> <br/>
                <button style={{width:"60px", high:"60px"}}><img src='https://cdn-icons-png.flaticon.com/512/4442/4442016.png' style={{width:"30px", high:"30px"}}/></button>          
            </div>
        ))}
    </div>
  )
}

export default ShowTasks