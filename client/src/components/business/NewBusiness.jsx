import { FormInputs } from "../formInputs"
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SendIcon from '@mui/icons-material/Send';
import { APIrequests } from "../../APIrequests";
import { useState } from "react";
import ButtonAppBar from "../ButtonAppBar";
import "./BusinessForm.css";
export default function NewBusiness() {
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
    const sendOtpCode = async (businessDetailsInput) => {
        try {
            const requestBody = {
                "email": businessDetailsInput.email,
                "userName": businessDetailsInput.userName
            }
            const response = await APIrequest.postRequest(`/businesses`, requestBody);
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
            const new_otp = otp
            const requestBody = { userId: businessDetails.userId, otp: new_otp };
            console.log(requestBody)
            const response = await APIrequest.postRequest(`/businesses/verify`, requestBody);
            console.log("response", response)
            alert("success")
        }
        catch (error) {
            console.log(error)
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
            <h2>Sign up for Events Rating, glad you came! </h2>
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
            <Button variant="contained" endIcon={<SendIcon />} sx={{
                bgcolor: "lightpink", mt: "20px", '&:hover': {
                    backgroundColor: "rgb(255, 246, 234)"
                }
            }}>
                Send
            </Button>
        </form>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: verifyOtp,
            }}
        >
            <DialogContent>
                <DialogContentText> You received an email with a verification code</DialogContentText>
                <FormInputs.otpInput setOtp={setOtp} otp={otp} />
            </DialogContent>
            <DialogActions>
                <Button type="submit">to verify</Button>
                <Button onClick={() => sendOtpCode(userDetails)}>resending</Button>
                <Button onClick={handleClose}>cancel</Button>
            </DialogActions>
        </Dialog>
    </>)
} 