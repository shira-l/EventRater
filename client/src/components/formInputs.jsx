import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Input } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export class FormInputs {
    static emailInput(props) {
        const { register, errors } = props
        return <> <FormControl sx={{ mt: 1, width: '22ch' }} variant="standard">
            <TextField name="email"
                label="email" type="text" variant="standard"
                {...register("email", {
                    required: "please enter your email",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'please enter a valid email'
                    }
                })} />
        </FormControl>
            <InputLabel sx={{ ml: 1}}>{errors.email?.message}</InputLabel></>
    }
    static passwordInput(props) {
        const { register, errors } = props
        const [showPassword, setShowPassword] = React.useState(false);

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        return <><FormControl sx={{ m: 1 , width: '22ch' }} variant="standard">
            <InputLabel>password</InputLabel>
            <Input name="password" variant="standard"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
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
        </FormControl>
            <InputLabel>{errors.password?.message}</InputLabel></>
    }
    static userNameInput(props) {
        const { register, errors } = props
        return <><TextField margin="normal" name="name"
            label="user name" type="text" variant="standard"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }}
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
            <InputLabel sx={{ ml: 1}}>{errors.userName?.message}</InputLabel></>
    }
    static otpInput(props) {
        const { otp, setOtp } = props;

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
    static phoneInput(props) {
        const { register, errors } = props
        return (
            <><TextField  id="phone" name='phone'
                type="phone" margin="normal" variant="standard"
                {...register("phone", {
                    require: "please enter your phone number"
                })} mask="999-999-9999" />
                <InputLabel>{errors.phone?.message}</InputLabel></>

        )
    }


}