import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {loadUserInfo, logout} from '../slices/userSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const {isAuth, role} = useSelector((state)=>state.user)
    
    useEffect(()=>{
      dispatch(loadUserInfo())
    },[])

    const {name} = useSelector((state)=>state.user.userInfo)
  return (
    <div className='navBar'>
        <Link to='/' className='logo'><h1>Home</h1></Link>
        {isAuth && role === "manager" ?
        <Link to='/Dashboard' className='loginName'>{name}-Dashboard</Link>
        :
        isAuth && role === 'user' ?
        <Link to='/Profile' className='loginName'>{name}-Profile</Link>
        :
        <Link to='/Login' className='loginNavBar'>Login</Link>
        }

        {isAuth && <button onClick={()=>dispatch(logout())} 
         className='logoutNavBar'><Link to='/'>Logout</Link></button>}
    </div>
  )
}

export default Navbar