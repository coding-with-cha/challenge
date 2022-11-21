import {useEffect} from 'react';
import {useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom';
import { loginUser } from '../slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {errors: userError, isAuth, role} = useSelector((state)=>state.user);
  
  useEffect(()=>{
    if(isAuth && role === 'user') navigate ('/Profile')
    else if(isAuth && role === "manager") navigate('/Dashboard')
  },[]);

const {
  register:loginInfo,
  handleSubmit,
  formState:{errors},
} = useForm();

const userInfo = (data)=>{
  dispatch(loginUser({data,navigate}))
}

  return (
    <div className='loginPage'>
      <div className="loginForm">
      <form onSubmit={handleSubmit(userInfo)} className='form'>
          <input type="text" placeholder="E-mail" {...loginInfo('email',{required: true,
           pattern:
            {value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message:'invalid email',},
            })}/>
            {errors.email?.message}
          <input type="password" placeholder="Mot de Passe" {...loginInfo('password',{required: true,minLength:{value:6,
          message:'password should be of 6 characters length'}})}></input>
           {errors.password?.message}
           <p className="errorsLogin">{userError && userError}</p>
          <button>Login</button>
          <Link to='/Register' className='register'>Register</Link>
      </form>
      </div>
    </div>
  )
}

export default Login