import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {loadUserInfo} from '../slices/userSlice'

const Profile = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUserInfo())
  },[])

  const {name} = useSelector((state)=>state.user.userInfo)

  return (
    <div className='profile'>welcome back {name} :)</div>
  )
}

export default Profile