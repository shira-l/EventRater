import { FormInputs } from "../formInputs"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { APIrequests } from "../../APIrequests";
import CryptoJS from 'crypto-js';
import { useState } from "react";
import ButtonAppBar from "../ButtonAppBar";
import "./PersonalArea.css";

export default function BusinessLogin() {
    const APIrequest = new APIrequests()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const generatePasswordHash = (password) => {
        return CryptoJS.SHA256(password).toString();
    };

    const login = async (authDetails) => {
        const hash_password = generatePasswordHash(authDetails.password);
        const requestBody = {
            email: authDetails.email,
            password: hash_password,
        };
        try {
            const url = '/businesses/login';
            const response = await APIrequest.postRequest(url, requestBody);
            const newBusiness = {
                ...response.businessDetails,
                email: authDetails.email,
                userName: response.userName
            };
            localStorage.setItem('currentBusiness', JSON.stringify(newBusiness));
            localStorage.setItem('prices', JSON.stringify(response.priceOffers));
            navigate("/businesses/personal-area")
        } catch (error) {
            alert('Error, please try again with different email or password');
        }
        reset();
    }
    return (<>
        <ButtonAppBar />
        <form onSubmit={handleSubmit(login)} className="businessForn" style={{ marginTop: "150px" }}>
            <FormInputs.emailInput register={register} errors={errors} />
            <FormInputs.passwordInput register={register} errors={errors} />
            <Button variant="contained" endIcon={<SendIcon />} type="submit" sx={{
                bgcolor: "lightpink", mt: "20px", '&:hover': {
                    backgroundColor: "rgb(255, 246, 234)"
                }
            }}>Send</Button>
        </form>
    </>)
}