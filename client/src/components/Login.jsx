import React from 'react'
import CryptoJS from 'crypto-js';
import { APIrequests } from '../APIrequests.js'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from 'react';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Login() {
  const APIrequest = new APIrequests()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const generatePasswordHash = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword;
  }

  const login = async (userDetails) => {
    handleClose();
    const hash_password = generatePasswordHash(userDetails.password);
    const response = await APIrequest.postRequest(`/authentication/login`, { "email": userDetails.email, "password": hash_password });
    if (!response.ok)
      throw new Error('error, please try egain whith anouther email or password or sign up')
    const data = response.json();
  }




  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        הירשם
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(login),
        }}
      >
        <DialogTitle>התחבר</DialogTitle>
        <DialogContent>
          <DialogContentText> ברוך שובך! אנא היכנס כדי להמשיך</DialogContentText>
          <TextField autoFocus margin="normal" id="name" name="email"
            label="Email Address" type="email"
            fullWidth variant="standard"
            {...register("email", {
              required: "Please Enter Your Email!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please Enter A Valid Email!"
              }
            })} />
          <InputLabel fullWidth>{errors.email?.message}</InputLabel>
          <TextField autoFocus margin="normal" id="name" name="password"
            label="Password" type="password"
            fullWidth variant="standard"
            {...register("password", {
              required: "Please Enter Your Password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long!"
              }
            })} />
          <InputLabel fullWidth>{errors.password?.message}</InputLabel>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">שמור</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

// function Login() {
//   const APIrequest=new APIrequests()
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       email: '',
//       password: '',
//     }
//   });



//   async function login() {


//   return (
//     <>
//       <form onSubmit={handleSubmit(login)}>
//         <input type='email' placeholder='Email' {...register("email",
//           { required: true })} />
//           <br />
//         {errors.email && errors.email.type === "required" &&
//           (<span className='span'>Email is required</span>)}
//         <br />
//         <input type='password' placeholder='Password'  {...register("password",
//           { required: true, minLength: 6 })} />
//           <br />
//         {errors.password && errors.password.type === "minLength" &&
//           (<span className='span'>password must be a minimum of 6 characters long!</span>)}
//           <br />
//         {errors.password && errors.password.type === "required" &&
//           (<span className='span'>password is required</span>)}
//          <br />
//         <button onClick={login}>Login</button>
//         <Link to="/register">New User?</Link>
//       </form>
//     </>
//   )
// }

// export default Login