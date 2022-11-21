import './App.css';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRouteUser from './components/ProtectedRouteUser';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin';
import Login from './pages/Login';
import Register from './pages/Register'
import Projects from './pages/Projects'
import AddAdmin from './pages/AddAdmin';
import ShowTasks from './pages/ShowTasks';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route element={<ProtectedRouteUser/>}>
        <Route path='/Profile' element={<Profile/>}/>
      </Route>
      <Route element={<ProtectedRouteAdmin/>}>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/ShowTasks/:projectId' element={<ShowTasks/>}/>
      <Route path='/AddAdmin/:projectId' element={<AddAdmin/>}/>
      <Route path='/Projects' element={<Projects/>}/>
      </Route>
    </Routes>
    </div>
  );
}

export default App;
