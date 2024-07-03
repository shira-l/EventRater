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
import { FormInputs } from './FormInputs.jsx';
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

  const close = () => {
    onClose();
    setShowRegister(false);
  };

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
      const response = await APIrequest.postRequest('/authentication/login', requestBody);
      if (!response.ok) {
        alert('Error, please try again with different email or password');
      } else {
        const data = await response.json();
        const newUser = { ...data.user, email: userDetails.email };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        close();
      }
    } catch (error) {
      alert(error.message);
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
      const response = await APIrequest.postRequest('/authentication/register', requestBody);
      if (!response.ok) {
        alert('Registration failed, please try again');
      } else {
        alert('Registration successful! Please log in.');
        setShowRegister(false);
      }
    } catch (error) {
      alert(error.message);
    }
    reset();
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  return (
    <>
      {!showRegister ?
        <Dialog
          open={open}
          onClose={close}
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(login),
          }}
        >
          <DialogTitle>{'Login'}</DialogTitle>
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
            <Button type="submit">{'Login'}</Button>
          </DialogActions>
        </Dialog>
        :
        <Dialog
          open={open}
          onClose={close}
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmit(registerUser),
          }}
        >
          <DialogTitle>{'Register'}</DialogTitle>
          <DialogContent>
            <>
              <FormInputs.userNameInput register={register} errors={errors} />
              <FormInputs.emailInput register={register} errors={errors} />
              <FormInputs.passwordInput register={register} errors={errors} />
            </>
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button type="submit">{'Register'}</Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
}

