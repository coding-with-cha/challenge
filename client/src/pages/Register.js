import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../slices/userSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm();
    const {errors: userError} = useSelector((state)=>state.user);

    const userInfo = (data)=>{
        dispatch(registerUser({data,navigate}))
    }
  return (
    <div>
        <div className="registerPage">
          <form onSubmit={handleSubmit(userInfo)} className="registerForm">
            <input
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
            />
            <input
              type="text"
              placeholder="email"
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "invalid email",
                },
              })}
            />
            <p>{errors.email?.message}</p>
            <input
              type="password"
              placeholder="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "password should be of 6 characters length",
                },
              })}
            ></input>
            <p>{errors.password?.message}</p>
            <p>{userError && userError}</p>
            <button>Register</button>
          </form>
        </div>
    </div>
  )
}

export default Register