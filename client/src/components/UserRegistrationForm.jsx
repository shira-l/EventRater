
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


export default function UserRegistrationForm() {
    const APIrequest = new APIrequests()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
        }
    })

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    }

    const generatePasswordHash = (password) => {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        return hashedPassword;
    }

    const registerUser = async (userDetails) => {
        handleClose();
        const hash_password = generatePasswordHash(userDetails.password);
        const response = await APIrequest.postRequest(`/authentication/login`, { "email": userDetails.email, "password": hash_password });
        if (!response.ok)
            throw new Error('error, please try egain whith anouther email or password or sign up')
        const data = response.json();
    }




    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(registerUser),
                }}
            >
                <DialogTitle>הירשם</DialogTitle>
                <DialogContent>
                    <DialogContentText> ברוך הבא! אנא היכנס כדי להמשיך</DialogContentText>
                    <TextField autoFocus margin="normal" name="userName"
                        label="user name" type="text" variant="standard"
                        {...register("userName", {
                            required: "Please Enter Your user name",
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Please Enter only alphabetic characters"
                            },
                            minLength: {
                                value: 2,
                                message: "user name must be at least 2 characters long!"
                            },
                            maxLength:{
                                value: 20,
                                message: "user name must be maximum 20 characters long!"
                            }
                        })} />
                         <InputLabel>{errors.userName?.message}</InputLabel>
                    <TextField autoFocus margin="normal" name="email"
                        label="Email Address" type="email" variant="standard"
                        {...register("email", {
                            required: "Please Enter Your Email!",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please Enter A Valid Email!"
                            }
                        })} />
                    <InputLabel>{errors.email?.message}</InputLabel>
                    <TextField autoFocus margin="normal" name="password"
                        label="Password" type="password" variant="standard"
                        {...register("password", {
                            required: "Please Enter Your Password",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long!"
                            },
                            maxLength:{
                                value: 20,
                                message: "Password must be maximum 20 characters long!"
                            }
                        })} />
                    <InputLabel>{errors.password?.message}</InputLabel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>בטל</Button>
                    <Button type="submit">שמור</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}