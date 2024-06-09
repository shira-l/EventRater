import React from 'react'
import CryptoJS from 'crypto-js';
import { APIrequests } from '../APIrequests.js'
import { useForm } from "react-hook-form";
import { useState, useContext } from 'react'
import { Link } from "react-router-dom";

function Login() {
  const APIrequest=new APIrequests()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const generatePasswordHash = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword;
  };

  async function login() {
    const hash_password = generatePasswordHash(password);
    const response = await APIrequest.postRequest(`/login`, { "email": email, "password_hash": hash_password });
    if (!response.ok)
      throw new Error('error, please try egain whith anouther email or password or sign up')
    const data = response.json();
    localStorage.setItem("TOKEN", data.accessToken);
  }

  return (
    <>
      <form onSubmit={handleSubmit(login)}>
        <input type='email' placeholder='Email' {...register("email",
          { required: true })} />
          <br />
        {errors.email && errors.email.type === "required" &&
          (<span className='span'>Email is required</span>)}
        <br />
        <input type='password' placeholder='Password'  {...register("password",
          { required: true, minLength: 6 })} />
          <br />
        {errors.password && errors.password.type === "minLength" &&
          (<span className='span'>password must be a minimum of 6 characters long!</span>)}
          <br />
        {errors.password && errors.password.type === "required" &&
          (<span className='span'>password is required</span>)}
         <br />
        <button onClick={login}>Login</button>
        <Link to="/register">New User?</Link>
      </form>
    </>
  )
}

export default Login