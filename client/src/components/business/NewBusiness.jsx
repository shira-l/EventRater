import { FormInputs } from "../formInputs"
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { APIrequests } from "../../APIrequests";
import { useState } from "react";
export default function NewBusiness() {
    const APIrequest = new APIrequests()
    const [formDisplay, setformDisplay] = useState("basic")
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: '',
            userName: '',
        }
    })
    const sendOtpCode = async (businessDetails) => {
        try {
            const requestBody = {
                "email": businessDetails.email,
                "userName": businessDetails.userName
            }
            const response = await APIrequest.postRequest(`/businesses`,requestBody);
            if (!response.ok) {
                alert("The join request failed, please try again")
                reset()
            }
            else {
                setformDisplay("otp")
            }
        }
        catch (error) {
            alert(error.message)
            reset()
        }
        
    }
    return (<><form onSubmit={handleSubmit(sendOtpCode) }>
        <FormInputs.userNameInput register={register} errors={errors} />
        <FormInputs.emailInput register={register} errors={errors} />
        <Button type="submit">שלח</Button>
    </form>
    {formDisplay == "otp" && <FormInputs.otpInput />}</>)
}