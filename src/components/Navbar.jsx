import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const token=localStorage.getItem("token");
    const navigate=useNavigate();
    const handleLogOut=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }
  return (
    <nav className='navbar navbar-dark bg-dark px-4'>
       <span className='navbar-brand h-1'>MyApp</span>
       <div>
        {
            token ? (
                <button className='btn btn-danger' onClick={handleLogOut}>LogOut</button>
            ):(
                <Link href="/" className='btn btn-light bth-primary'>Login</Link>
            )
        }
       </div>  
    </nav>
    
  )
}

export default Navbar
