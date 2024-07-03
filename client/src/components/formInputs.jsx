import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import {InputMask} from 'primereact/inputmask';
import { border } from '@mui/system';
export class FormInputs {
    static emailInput(props) {
        const { register, errors } = props
        return <><TextField autoFocus margin="normal" name="email"
            label="כתובת אימייל" type="email" variant="standard"
            {...register("email", {
                required: "אנא הכנס את המייל שלך",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '!אנא להזין דוא"ל תקף'
                }
            })} />
            <InputLabel>{errors.email?.message}</InputLabel>
        </>
    }
    static passwordInput(props) {
        const { register, errors } = props
        return <><TextField autoFocus margin="normal" name="password"
            label="סיסמה" type="password" variant="standard"
            {...register("password", {
                required: "אנא הזן סיסמה ",
                minLength: {
                    value: 8,
                    message: "!סיסמה חייבת להיות באורך 8 תווים לפחות"
                },
                maxLength: {
                    value: 20,
                    message: "!סיסמה חייבת להיות באורך של 20 תווים לכל היותר"
                }
            })} />
            <InputLabel>{errors.password?.message}</InputLabel>
        </>
    }
    static userNameInput(props) {
        const { register, errors } = props
        return <><TextField autoFocus margin="normal" name="name"
            label="שם משתמש" type="text" variant="standard"
            {...register("userName", {
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
            })} />
            <InputLabel>{errors.userName?.message}</InputLabel></>
    }
   static otpInput(props) {
        const {otp, setOtp} = props;

        return (
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                shouldAutoFocus:true
                skipDefaultStyles:true
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
            />
        );
    }
    static phoneInput(props){
        const { register } = props
        return (
            <InputMask placeholder="Enter phone number" id="phone"
            { ...register("phone",{
                require:"please enter your phone number"
            })} mask="999-999-9999" />
    )
}
        
        
}