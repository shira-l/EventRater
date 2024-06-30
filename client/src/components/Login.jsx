import React from 'react'
import CryptoJS from 'crypto-js';
import { APIrequests } from '../APIrequests.js'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserRegistrationForm from './UserRegistrationForm.jsx'
import { FormInputs } from './formInputs.jsx';
import { UserContext } from '../UserProvider.jsx';
export default function Login() {
  const APIrequest = new APIrequests()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const [open, setOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
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
    try { const response = await APIrequest.postRequest(`/authentication/login`, { "email": userDetails.email, "password": hash_password });
    if (!response.ok)
      alert('error, please try egain whith anouther email or password or sign up')
    else {
      const data = await response.json();
      delete userDetails.password;
      const newUser = { ...data.user, ...userDetails };
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setCurrentUser(newUser);
    } }
    catch(error){
      alert(error.message)
    }
    
  }




  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
        התחבר
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
          <FormInputs.emailInput register={register} errors={errors} />
          <FormInputs.passwordInput register={register} errors={errors} />
          <FormInputs.otpInput />

          <DialogContentText>אינך רשום עדיין ?<Link onClick={handleRegister}>הירשם</Link></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>בטל</Button>
          <Button type="submit">שמור</Button>
        </DialogActions>
      </Dialog>
      {openRegister && <UserRegistrationForm generatePasswordHash={generatePasswordHash} setOpen={setOpenRegister} />}
    </React.Fragment>
  );
}