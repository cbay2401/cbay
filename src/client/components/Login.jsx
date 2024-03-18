import React, { useState } from 'react';
import {useNavigate}  from "react-router-dom";
import axios from 'axios';

const LoginForm = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleLogin(event){
  event.preventDefault()
  try{
    const response = await axios.post(
      "http://localhost:3000/api/users/login",
      {
        email,
        password,
      }


      )
      console.log("login Successful", response)
      navigate ("/users/account")
      const token=response.data.token
      setToken(token);
    }catch (err){
      console.error("Error in login ", err.message)

  }


  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
};


export default LoginForm;
