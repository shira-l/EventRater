import { FormInputs } from "../formInputs"
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { APIrequests } from "../../APIrequests";
import { useState } from "react";
export default function NewBusiness() {
    const APIrequest = new APIrequests()
    const [otp, setOtp] = useState('')
    const [businessDetails, setBusinessDetails] = useState({})
    const [open, setOpen] = useState(false);
    const [formDisplay, setformDisplay] = useState(false)

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
            if (!response.ok) {
                alert("The join request failed, please try again")
                reset()
            }
            else {
                console.log(businessDetails)
                if (businessDetails== null) {
                    const userId =await response.json().id;
                    console.log("userId",userId)
                    setBusinessDetails({ ...businessDetailsInput, userId: userId });
                }
                handleClickOpen(true)
            }
        }
        catch (error) {
            alert(error.message)
            reset()
        }
    }
    const verifyOtp = async () => {
        try {
            const requestBody = { userId: businessDetails.userId, otp: otp };
            const response = await APIrequest.postRequest(`/businesses/verify`, requestBody);
            if (!response.ok) {
                alert("The code you entered is incorrect, please try again")
                setOtp('')
            }
            alert("success")
        }
        catch (error) {
            alert(error.message)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (<>
    <form onSubmit={handleSubmit(sendOtpCode)}>
        <FormInputs.userNameInput register={register} errors={errors} />
        <FormInputs.emailInput register={register} errors={errors} />
        <Button type="submit">שלח</Button>
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
                <Button onClick={handleClose}>cencel</Button>
            </DialogActions>
        </Dialog> </>)
}