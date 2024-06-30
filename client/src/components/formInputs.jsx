import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
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
            {...register("name", {
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
        const [otp, setOtp] = useState('');

        return (
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
            />
        );
    }
}
