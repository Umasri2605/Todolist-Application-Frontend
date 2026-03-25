import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user,setUser]=useState({
        username:"",
        password:"",
    });
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {username,password}=user;
        if(!password || !username){
            alert("Both are Required");
            return;
        }
        try{
            const res=await fetch("http://localhost:3200/user/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({username,password})
            });
            const data=await res.json();
            if(data.msg=="success"){
               localStorage.setItem("token",data.token);
               localStorage.setItem("user",JSON.stringify(data.user));
               alert("Login Successfull");
               navigate("/todos");
            } else {
                if(user.password !==password){
                    alert("Invalid Credentails")
                }
            }
        } catch(err){
            console.log(err.message);
        }
    }
  return (
    <div className='container mt-5'>
      <div className='card shadow-sm mx-auto' style={{maxWidth:"350px"}}>
       <div className='card-body'>
        <h3 className='text-center mb-3'>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input type="text"
            className='form-control'
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder='Enter Username'
            />
            </div>
            <div className='mb-3'>
            <input type="password"
            className='form-control'
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder='Enter Password'
            />
          </div>
          <button className='btn btn-primary w-100'>Submit</button>
        </form>
       </div>
      </div>
    </div>
  )
}

export default Login
