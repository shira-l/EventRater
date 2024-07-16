import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EnumSelect from "../EnumSelect";
import { FormInputs } from "../formInputs";
import { useForm } from "react-hook-form";
import CryptoJS from 'crypto-js';
import PriceOffersList from "../priceOffers";
import { useLocation } from "react-router-dom";
import { EnumContext } from "../EnumsProvider";
import ButtonAppBar from "../ButtonAppBar";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { APIrequests } from "../../APIrequests";
import './PersonalArea.css'
export default function PersonalArea() {

    const navigate = useNavigate()
    const Location = useLocation()
    const APIrequest = new APIrequests()
    const { locations, categories } = useContext(EnumContext)
    const [isNewBusiness, setIsNewBusiness] = useState(!localStorage.getItem("currentBusiness"))
    const [priceOffers, setPriceOffers] = useState(isNewBusiness ? [] : JSON.parse(localStorage.getItem("prices")))
    const businessDetails = isNewBusiness ?
        {
            phone: '',
            about: '',
            location: '',
            category: ''
        } :
        JSON.parse(localStorage.getItem("currentBusiness"))
    const authBusinessDetails = isNewBusiness ? Location.state.authDetails : {
        email: businessDetails.email,
        userName: businessDetails.userName
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            phone: businessDetails.phone,
            password: '',
            about: businessDetails.about,
            location: businessDetails.location,
            category: businessDetails.category
        }
    })
    const { register: savePrice, handleSubmit: handleSubmitPrice, formState: { errors: priceErrors }, reset: resetPrice } = useForm({
        defaultValues: {
            itemPrice: '',
            itemDescription: '',
        }
    })

    const generatePasswordHash = (password) => {
        return CryptoJS.SHA256(password).toString();
    };

    const handleLogout = () => {
        localStorage.removeItem('currentBusiness');
        localStorage.removeItem('prices');
        navigate('/home')
    }


    const addPrice = async (priceDetails) => {
        try {
            const requestBody = {
                ...priceDetails,
                businessId: businessDetails.idBusiness
            }
            if (!isNewBusiness) {
                await APIrequest.postRequest("/prices", requestBody);
            }
            setPriceOffers([...priceOffers, priceDetails])
            if (priceOffers.length == 4) {
                alert("You have used the amount of offers available to you")
            }
        }
        catch (error) {
            alert("Error adding price offer", error.message);
        }
        resetPrice();
    }


    const saveData = (inputDetails) => {
        if (isNewBusiness)
            addNewBusiness(inputDetails)
        else
            updateBusiness(inputDetails)
    }


    const addNewBusiness = async (inputDetails) => {
        const hashPassword = generatePasswordHash(inputDetails.password);
        delete inputDetails.password;
        const requestBody = {
            businessDetails: inputDetails,
            priceOffers: priceOffers,
            userName: authBusinessDetails.userName,
            userId: authBusinessDetails.userId,
            password: hashPassword
        }
        try {
            const url = `/businesses`;
            const response = await APIrequest.postRequest(url, requestBody);
            const newBusiness = { idBusiness: response.data, ...inputDetails, ...authBusinessDetails }
            localStorage.setItem('currentBusiness', JSON.stringify(newBusiness));
            localStorage.setItem('prices', JSON.stringify(priceOffers));
            setIsNewBusiness(false)
        }
        catch (error) {
            alert("Error adding business", error.message);
            reset();
        }

    }

    const updateBusiness = async (inputDetails) => {
        delete inputDetails.password;
        try {
            const url = `/businesses/${businessDetails.idUser}`;
            const response = await APIrequest.putRequest(url, inputDetails);
            const newBusiness = { idBusiness: response.idBusiness, ...inputDetails, ...authBusinessDetails }
            localStorage.setItem('currentBusiness', JSON.stringify(newBusiness));
            localStorage.setItem('prices', JSON.stringify(priceOffers));
        }
        catch (error) {
            alert("You are already registered. Please log in with your credentials.");
        }
        reset();
    }
    return (<>
        <ButtonAppBar />
        <div className='forms-container'>
            <form onSubmit={handleSubmit(saveData)} className="businessForn">
                <div> <p>Personal Information:</p>
                <p id="p-profile"><span> {businessDetails.userName}</span>  
                <span>{businessDetails.email}</span></p>
                    <EnumSelect currentEnum="category" register={register}
                        errors={errors} enumValues={categories} defaultValue={businessDetails.category} />
                    <EnumSelect currentEnum="location" register={register}
                        errors={errors} enumValues={locations} defaultValue={businessDetails.location} />
                    <br />
                    <FormInputs.phoneInput register={register} errors={errors} />
                </div>
                <div> <p>Tell us about you:</p>
                    <TextField
                        label="About me"
                        margin="normal" multiline rows={5}
                        style={{ width: " 32ch" }}
                        {...register("about", { required: "Please tell us about you" })}
                        helperText={errors.about ? errors.about.message : ''}
                    />
                </div>

                {isNewBusiness ? <>
                    <FormInputs.passwordInput register={register} errors={errors} />
                    <Button type="submit">Submit</Button> </> :
                    <>
                        <Button type="submit">Save Changes</Button>
                        <Button onClick={() => navigate(`/businesses/${businessDetails.idBusiness}`)}>To My Profile</Button>
                    </>
                }
            </form >
            <div><p>Price Offers:</p>
                {priceOffers.length < 5 &&
                    <form className="price-form" onSubmit={handleSubmitPrice(addPrice)}>
                        <FormInputs.amountInput register={savePrice} errors={priceErrors} />
                        <FormInputs.descriptionInput register={savePrice} errors={priceErrors} />
                        <button type='submit'>Add</button>
                    </form>
                }
                <PriceOffersList priceOffers={priceOffers} setPriceOffers={setPriceOffers} isNewBusiness={isNewBusiness} />
                <Button onClick={handleLogout}>logout</Button>
            </div>
        </div>
    </>)
}