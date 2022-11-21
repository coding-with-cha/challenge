import React, { useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getallUsers, managerUpListProjectUser } from '../slices/userSlice'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { managerUpAdminListProject } from '../slices/projectSlice'
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
    const {projectId} = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(()=>{ 
      dispatch(getallUsers())
    },[])
  
    const {loading, listUsers, errors} = useSelector((state)=>state.user)
    const handleAddAdmin = (userId) => { 
        dispatch(managerUpAdminListProject({_id:projectId, userId:userId}));
        dispatch(managerUpListProjectUser({userId:userId, projectId:projectId}));
        navigate("/Projects");
    }
    
  return (
    <div className='projects'>        
        {listUsers && listUsers.map(user=>(
            <div key={user._id} className="project">
                <h6>Name: {user.name}</h6>
                <h6>E-mail: {user.email}</h6>
                <button onClick={()=>handleAddAdmin(user._id)}>Add</button>
            </div>
        ))}
    </div>
  )
}

export default AddAdmin