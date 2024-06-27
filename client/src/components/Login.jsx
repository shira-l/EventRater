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
import UserRegistrationForm from './UserRegistrationForm.jsx'

export default function Login() {
  const APIrequest = new APIrequests()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  })
  const emailValidate = {
    required: "אנא הכנס את המייל שלך",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: '!אנא להזין דוא"ל תקף'
    }
  };
  const passwordValidate = {
    required: "אנא הזן סיסמה ",
    minLength: {
      value: 8,
      message: "!סיסמה חייבת להיות באורך 8 תווים לפחות"
    },
    maxLength: {
      value: 20,
      message: "!סיסמה חייבת להיות באורך של 20 תווים לכל היותר"
    }
  }
  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const handleRegister = () => {
    handleClose();
    setOpenRegister(true);
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
        התחבר
      </Button>
      <Dialog dir='rtl'
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

          <TextField autoFocus margin="normal" name="email"
            label="כתובת אימייל" type="email" variant="standard"
            {...register("email", emailValidate)} />

          <InputLabel>{errors.email?.message}</InputLabel>

          <TextField autoFocus margin="normal" name="password"
            label="סיסמה" type="password" variant="standard"
            {...register("password", passwordValidate)} />

          <InputLabel>{errors.password?.message}</InputLabel>

          <DialogContentText>אינך רשום עדיין ?<Link onClick={handleRegister}>הירשם</Link></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>בטל</Button>
          <Button type="submit">שמור</Button>
        </DialogActions>
      </Dialog>
      {openRegister && <UserRegistrationForm emailValidate={emailValidate} passwordValidate={passwordValidate}/>}
    </React.Fragment>
  );
}