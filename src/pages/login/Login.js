import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './Login.scss'
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';

const Login = () => {
  const [email ,setEmail] =useState('');
  const [password ,setPassword] =useState('');
  const navigate =useNavigate();
  async function handleSubmit(e){
    //page do not reload when i submit the form
    e.preventDefault();
    try{
    const response =await axiosClient.post('/auth/login',{
      email,
      password
    });
    //accessToken ko save kar lege when it first time login and navigate to home page directly when it come again 
    setItem(KEY_ACCESS_TOKEN ,response.result.accessToken);
    navigate('/');
  }
  catch(error){
    console.log(error);
  }
  }

  return (
    <div className='Login'>
      <div className='login-box'>
        <h2 className='heading'>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type="email" className='email' id="email" onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor='password'>Password</label>
          <input type="password" className='password' id="password" onChange={(e) => setPassword(e.target.value)}/>

          <input type='Submit' className='submit'/>
        </form>
        <p className='subheading'> Do not have an account? <Link to ="/signup">Sign Up</Link></p>
      </div>
    </div>

  )
}

export default Login
