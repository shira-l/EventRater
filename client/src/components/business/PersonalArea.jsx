import React, { useState, useContext } from "react";
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
    const Location = useLocation()
    const APIrequest = new APIrequests()
    const { locations, categories } = useContext(EnumContext)
    const [priceOffers, setPriceOffers] = useState([])
    const authBusinessDetails = Location.state.businessDetails;
    const isNewBusiness = Object.keys(authBusinessDetails).length == 3;

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            phone: '',
            password: '',
            about: '',
            location: '',
            category: ''
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

    const addPrice = (priceDetails) => {
        setPriceOffers([...priceOffers, priceDetails])
        resetPrice();
        if (priceOffers.length == 4) {
            alert("You have used the amount of offers available to you")
        }
    }
    const addNewBusiness = async (inputDetails) => {
        console.log(inputDetails)
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
            const url = '/businesses';
            const response = await APIrequest.postRequest(url, requestBody);
            console.log("business id", response.data)
        }
        catch (error) {
            alert("You are already registered. Please log in with your credentials.");
        }
        reset();
    }


    return (<>
        <ButtonAppBar />
        <div className="profile-div">
            <p>{authBusinessDetails.userName}</p>
            <p>{authBusinessDetails.email}</p>
        </div>
        <div className='forms-container'>
            <form onSubmit={handleSubmit(addNewBusiness)} className="businessForn">
                <div> <p>Personal Information:</p>
                    <EnumSelect currentEnum="category" register={register}
                        errors={errors} enumValues={categories} />
                    <EnumSelect currentEnum="location" register={register}
                        errors={errors} enumValues={locations} />
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
                <FormInputs.passwordInput register={register} errors={errors} />
                {isNewBusiness ? <Button type="submit">Submit</Button> :
                    <>
                        <Button>Save Changes</Button>
                        <Button>To My Profile</Button>
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
                <PriceOffersList priceOffers={priceOffers} setPriceOffers={setPriceOffers} />
            </div>
        </div>
    </>)
}