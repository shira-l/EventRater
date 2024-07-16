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
import OTPInput from "otp-input-react";
import { useEffect } from "react";

export default function BusinessRegister() {
    const navigate = useNavigate()
    const APIrequest = new APIrequests()
    const [otp, setOtp] = useState('')
    const [businessDetails, setBusinessDetails] = useState(null)
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: '',
            userName: '',
        }
    })

    useEffect(() => {
        if (localStorage.getItem("currentBusiness"))
            navigate("/businesses/personal-area")
    }, [])

    const sendOtpCode = async (businessDetailsInput) => {
        try {
            const requestBody = {
                "email": businessDetailsInput.email,
                "userName": businessDetailsInput.userName
            }
            const url = `/businesses/register`;
            const response = await APIrequest.postRequest(url, requestBody);
            if (businessDetails == null) {
                const userId = await response.id;
                setBusinessDetails({ ...businessDetailsInput, userId: userId });
            }
            handleClickOpen(true)
        }
        catch (error) {
            alert("The join request failed, please try again")
            reset()
        }
    }


    const verifyOtp = async () => {
        try {
            const requestBody = { userId: businessDetails.userId, otp: otp };
            const response = await APIrequest.postRequest(`/businesses/verify`, requestBody);
            handleClose()
            if (response) {
                alert("Verification was successful. You are taken to your personal area")
                navigate("/businesses/personal-area", { state: { authDetails: businessDetails } })
            }

        }
        catch (error) {
            console.error(error.message)
            alert("The code you entered is incorrect, please try again")
            setOtp('')
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

   

    return (<>

        <ButtonAppBar />
        <p className="p-sign-up">
            <h2>Sign up for Event Rating, glad you came!</h2>
            Events Rating website aims to be the most advanced website for the community of professionals in the field of events,
            and to give you and the website surfers an excellent experience.
            <br />
            The site is in the launch period, and registration to the site is currently free of charge.
            <br />
            Please note, in Events Rating we only advertise qualified professionals, and appearing on the website involves verifying the details.
            After registration,
            we will verify the details and if everything is correct, you will be added to the site.
        </p>

        <form onSubmit={handleSubmit(sendOtpCode)} className="businessForn">
            <FormInputs.userNameInput register={register} errors={errors} />
            <FormInputs.emailInput register={register} errors={errors} />
            <Button variant="contained" endIcon={<SendIcon />} type="submit" sx={{
                bgcolor: "lightpink", mt: "20px", '&:hover': {
                    backgroundColor: "rgb(255, 246, 234)"
                }
            }}>Send</Button>
        </form>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit(verifyOtp),
            }}
        >
            <DialogContent style={{ display: "flex" }}>
                <DialogContentText> You received an email with a verification code</DialogContentText>
                <OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
            </DialogContent>
            <DialogActions>
                <Button type="submit">to verify</Button>
                <Button onClick={() => sendOtpCode(userDetails)}>resending</Button>
                <Button onClick={handleClose}>cancel</Button>
            </DialogActions>
        </Dialog>
    </>)
} 