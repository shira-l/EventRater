import { FormInputs } from "../formInputs"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SendIcon from '@mui/icons-material/Send';
import { APIrequests } from "../../APIrequests";
import { useState } from "react";
import ButtonAppBar from "../ButtonAppBar";
import "./PersonalArea.css";

export default function BusinessLogin(){
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    return(<>
    <ButtonAppBar/>
     <form onSubmit={handleSubmit(sendOtpCode)} className="businessForn">
            <FormInputs.emailInput register={register} errors={errors} />
            <FormInputs.passwordInput register={register} errors={errors}/>
            <Button variant="contained" endIcon={<SendIcon />} type="submit" sx={{
                bgcolor: "lightpink", mt: "20px", '&:hover': {
                    backgroundColor: "rgb(255, 246, 234)"
                }
            }}>Send</Button>
        </form>
    </>)
}