import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Input } from '@mui/material';
import { Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export class FormInputs {
    static emailInput(props) {
        const { register, errors } = props
        return <div> <FormControl sx={{ m: 1, width: '22ch' }} variant="standard">
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
            <InputLabel sx={{ ml: 1 }}>{errors.email?.message}</InputLabel></div>
    }
    static passwordInput(props) {
        const { register, errors } = props
        const [showPassword, setShowPassword] = React.useState(false);

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        return <><FormControl sx={{ m: 1, width: '22ch' }} variant="standard">
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
                    required: "Please enter a password.",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long."
                    },
                    maxLength: {
                        value: 20,
                        message: "Password must be at most 20 characters long."
                    }
                })} />
        </FormControl>
            <InputLabel>{errors.password?.message}</InputLabel></>
    }
    static userNameInput(props) {
        const { register, errors } = props
        return <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, paddingBottom: 0.5, my: 0.5 }} /><TextField margin="normal" name="name"
                sx={{ width: '19.5ch' }} label="user name" type="text" variant="standard"
                {...register("userName", {
                    required: "Please enter a username.",
                    pattern: {
                        value: /^[a-z\u0590-\u05fe]+$/i,
                        message: "Please enter only alphabetic characters."
                    },
                    minLength: {
                        value: 2,
                        message: "Username must be at least 2 characters long."
                    },
                    maxLength: {
                        value: 20,
                        message: "Username must be at most 20 characters long."
                    }
                })} />
            <InputLabel sx={{ ml: 1 }}>{errors.userName?.message}</InputLabel> </Box>
    }
    static otpInput(props) {
       // const [otp, setOtp] = useState('');
        const { register } = props
        return (
            <OtpInput
                // value={otp}
                // onChange={setOtp}
                {...register("otp",{})}
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
            <><TextField id="phone" name='phone' label='phone'
                type="phone" margin="normal" variant="standard"
                {...register("phone", {
                    require: "please enter your phone number"
                })} mask="999-999-9999" />
                <InputLabel>{errors.phone?.message}</InputLabel></>

        )
    }
    static amountInput(props) {
        const { register, errors } = props
        return (<div><FormControl sx={{ m: 1, width: '10ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input   {...register("amount", {
                required: "please enter amount",
                pattern: {
                    value: /^[0-9]+$/i,
                    message: "please enter only numbers"
                },
            })}
                id="standard-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        </FormControl>
            <InputLabel>{errors.amount?.message}</InputLabel>
        </div>)
    }
    static descriptionInput(props) {
        const { register, errors } = props
        return <div><TextField margin="normal" name="description" sx={{ m: 1, width: '22ch' }}
            label="description" type="text" variant="standard"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
                ),
            }}
            {...register("description", {
                required: "please enter description",
                pattern: {
                    value: /^[a-zA-Z\s]*$/i,
                    message: "Please enter only alphabetic characters"
                },
                minLength: {
                    value: 2,
                    message: "Description too short"
                },
                maxLength: {
                    value: 30,
                    message: "Description too long"
                }
            })} />
            <InputLabel sx={{ ml: 1 }}>{errors.description?.message}</InputLabel></div>
    }
}