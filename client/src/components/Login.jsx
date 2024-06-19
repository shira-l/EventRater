import React from 'react'
import CryptoJS from 'crypto-js';
import { APIrequests } from '../APIrequests.js'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Login() {
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit=(event)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    const password = formJson.password;
    checkValidation(email,password)
    handleClose();
  }
  const checkValidation =(email,password)=>{

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
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>התחבר</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ברוך שובך! אנא היכנס כדי להמשיך
          </DialogContentText>
          <TextField required
            margin="normal" id="name" name="email"
            label="Email Address"
            type="email"
            fullWidth variant="standard"
          />
           <label className="errorLabel">{emailError}</label>
          <TextField autoFocus required
            margin="normal" id="name" name="password"
            label="Password"
            type="password"
            fullWidth variant="standard"
          />
           <label className="errorLabel">{passwordError}</label>
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

//   const generatePasswordHash = (password) => {
//     const hashedPassword = CryptoJS.SHA256(password).toString();
//     return hashedPassword;
//   };

//   async function login() {
//     const hash_password = generatePasswordHash(password);
//     const response = await APIrequest.postRequest(`/login`, { "email": email, "password_hash": hash_password });
//     if (!response.ok)
//       throw new Error('error, please try egain whith anouther email or password or sign up')
//     const data = response.json();
//     localStorage.setItem("TOKEN", data.accessToken);
//   }

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