
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


export default function UserRegistrationForm(props) {
    const APIrequest = new APIrequests()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
        }
    })
    const { emailValidate, passwordValidate } = props;
    const userNameValidate = {
        required: "אנא הזן שם משתמש",
        pattern: {
            value: /^[a-z\u0590-\u05fe]+$/i,
            message: "נא להזין רק תווים אלפביתיים"
        },
        minLength: {
            value: 2,
            message: "!שם המשתמש חייב להיות באורך 2 תווים לפחות"
        },
        maxLength: {
            value: 20,
            message: "!שם המשתמש חייב להיות באורך של 20 תווים לכל היותר"
        }
    }
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
        const response = await APIrequest.postRequest(`/authentication/register`, { "userName":userDetails.userName,"email": userDetails.email, "password": hash_password });
        if (!response.ok)
           alert('error, please try egain whith anouther email or password or sign up')
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
                        label="שם משתמש" type="text" variant="standard"
                        {...register("userName",userNameValidate)} />
                    <InputLabel>{errors.userName?.message}</InputLabel>

                    <TextField autoFocus margin="normal" name="email"
                        label="כתובת אימייל" type="email" variant="standard"
                        {...register("email", emailValidate)} />
                    <InputLabel>{errors.email?.message}</InputLabel>

                    <TextField autoFocus margin="normal" name="password"
                        label="Password" type="password" variant="standard"
                        {...register("password", passwordValidate)} />
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