import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Input } from '@mui/material';
import { Box } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export class FormInputs {

    static emailInput({ register, errors }) {
        return (<FormControl sx={{ m: 1, width: '22ch' }} variant="standard">
            <TextField name="email"
                label="email" type="text" variant="standard"
                {...register("email", {
                    required: "please enter your email",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'please enter a valid email'
                    }
                })}
                helperText={errors.email ? errors.email?.message : ''} />
        </FormControl>)
    }


    static passwordInput({ register, errors }) {

        const [showPassword, setShowPassword] = useState(false);

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        return <FormControl sx={{ m: 1, width: '22ch' }} variant="standard">
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
            <FormHelperText>{errors.password ? errors.password.message : ''} </FormHelperText>
        </FormControl>
    }


    static userNameInput({ register, errors }) {

        return <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, paddingBottom: 0.5, my: 0.5 }} />
            <TextField margin="normal" name="userName"
                sx={{ width: '19.5ch' }} label="user name" type="text" variant="standard"
                {...register("userName", {
                    required: "Please enter a user name.",
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
                })}
                helperText={errors.userName ? errors.userName.message : ''} />
        </Box>
    }

    static phoneInput({ register, errors }) {
        return (
            <TextField id="phone" name='phone' label='phone'
                sx={{ m: 1, width: '21ch' }}
                type="phone" margin="normal" variant="standard"
                {...register("phone", {
                    required: "please enter your phone number"
                })}
                mask="999-999-9999"
                helperText={errors.phone ? errors.phone.message : ''}
            />
        )
    }

    static amountInput(props) {
        const { register, errors } = props
        return (<FormControl sx={{ m: 1, width: '10ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input   {...register("itemPrice", {
                required: "please enter amount",
                pattern: {
                    value: /^[0-9]+$/i,
                    message: "please enter only numbers"
                },
            })}
                id="standard-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            <FormHelperText>{errors.amount ? errors.amount.message : ''}</FormHelperText>
        </FormControl>
        )
    }


    static descriptionInput(props) {
        const { register, errors } = props
        return <TextField margin="normal" name="description" sx={{ m: 1, width: '22ch' }}
            label="description" type="text" variant="standard"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
                ),
            }}
            {...register("itemDescription", {
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
            })}
            helperText={errors.description ? errors.description.message : ''} />
    }
}