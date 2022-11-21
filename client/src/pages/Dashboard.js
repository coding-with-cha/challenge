import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../slices/projectSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState:{errors},
} = useForm();

const projectInfo = (data)=>{
  dispatch(createProject({data,navigate}))
}

  return (
    <div className="dash">
      <Link to='/Projects' className="Link">All Projects</Link>
      <div className="dashDiv">
          <form onSubmit={handleSubmit(projectInfo)} className="dashForm">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
            />
            <input
              type="text"
              placeholder="Description"
              {...register("description", {required: true })}
            />
            <button>Create</button>
          </form>
        </div>
    </div>
  )
}

export default Dashboard