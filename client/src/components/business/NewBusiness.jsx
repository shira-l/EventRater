import { FormInputs } from "../formInputs"
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { APIrequests } from "../../APIrequests";
import { useState } from "react";
export default function NewBusiness() {
    const APIrequest = new APIrequests()
    const [businessId, setBusinessId] = useState(0)
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            name: '',
        }
    })
    const sendOtpCode = async (businessDetails) => {
        try {
            const response = await APIrequest.postRequest(`/businesses`, { "email": businessDetails.email, "businessName": businessDetails.name });
            if (!response.ok)
                alert('error, please try egain whith anouther email or password or sign up')
            else {
                const businessId = await response.json();
                setBusinessId(businessId);
            }
        }
        catch (error) {
            alert(error.message)
        }

    }
    return (<><form onSubmit={handleSubmit(sendOtpCode)}>
        <FormInputs.userNameInput register={register} errors={errors} />
        <FormInputs.emailInput register={register} errors={errors} />
        {businessId!=0&&<FormInputs.otpInput/>}
        <Button type="submit">שלח</Button>
    </form></>)
}