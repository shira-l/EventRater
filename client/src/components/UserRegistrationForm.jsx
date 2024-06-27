
import React from 'react'
import { APIrequests } from '../APIrequests.js'
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormInputs } from './formInputs.jsx';

export default function UserRegistrationForm(props) {
    const APIrequest = new APIrequests()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
        }
    })
    const { generatePasswordHash, setOpen } = props;
    const handleClose = () => {
        setOpen(false);
    }

    const registerUser = async (userDetails) => {
        handleClose();
        const hash_password = generatePasswordHash(userDetails.password);
        const response = await APIrequest.postRequest(`/authentication/register`, { "userName": userDetails.userName, "email": userDetails.email, "password": hash_password });
        if (!response.ok)
            alert('error, please ')
        else{
            const data = response.json();
            alert(data)
        }
       
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
                    <FormInputs.userNameInput register={register} errors={errors} />
                    <FormInputs.emailInput register={register} errors={errors} />
                    <FormInputs.passwordInput register={register} errors={errors} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>בטל</Button>
                    <Button type="submit">שמור</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}