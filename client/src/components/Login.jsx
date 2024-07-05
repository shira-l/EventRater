import React, { useContext, useState } from 'react';
import CryptoJS from 'crypto-js';
import { APIrequests } from '../APIrequests.js';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormInputs } from './formInputs.jsx';
import { UserContext } from '../UserProvider.jsx';

export default function Login({ open, onClose }) {
  const APIrequest = new APIrequests();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      userName: '',
    }
  });
  const { setCurrentUser } = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);


  const generatePasswordHash = (password) => {
    return CryptoJS.SHA256(password).toString();
  };

  const login = async (userDetails) => {
    const hash_password = generatePasswordHash(userDetails.password);
    const requestBody = {
      email: userDetails.email,
      password: hash_password,
    };
    try {
      const url = '/authentication/login';
      const response = await APIrequest.postRequest(url, requestBody);
      const newUser = { ...response.user, email: userDetails.email };
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      close();
    } catch (error) {
      alert('Error, please try again with different email or password');
    }
    reset();
  };

  const registerUser = async (userDetails) => {
    const hash_password = generatePasswordHash(userDetails.password);
    const requestBody = {
      email: userDetails.email,
      password: hash_password,
      userName: userDetails.userName,
    };
    try {
      const url = '/authentication/register';
      const response = await APIrequest.postRequest(url, requestBody);
      setShowRegister(false);
      delete userDetails.password;
      const newUser = { idUser: response.id, userName: userDetails.userName, email: userDetails.email };
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
    }
    catch (error) {
      alert("You are already registered. Please log in with your credentials.");
    }
    reset();
  };

  const handleRegister = () => {
    onClose();
    setShowRegister(true);
  };

  const closeRegister = () => {
    setShowRegister(false)
  }
  
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(login),
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <>
            <FormInputs.emailInput register={register} errors={errors} />
            <FormInputs.passwordInput register={register} errors={errors} />
            <DialogContentText>
              Not registered yet?<Link onClick={handleRegister}>register</Link>
            </DialogContentText>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showRegister}
        onClose={closeRegister}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(registerUser),
        }}
      >
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <>
            <FormInputs.userNameInput register={register} errors={errors} />
            <FormInputs.emailInput register={register} errors={errors} />
            <FormInputs.passwordInput register={register} errors={errors} />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRegister}>Cancel</Button>
          <Button type="submit">{'Register'}</Button>
        </DialogActions>
      </Dialog>

    </>
  );
}

