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
            amount: '',
            description: '',
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
        const businessDetails = { ...authBusinessDetails, ...inputDetails, password: hashPassword }
        const requestBody = {
            businessDetails: businessDetails
            , priceOffers: priceOffers
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
    // const takePhoto = () => {
    //     if (!webCam) {
    //       setWebCamVisibility(true);
    //     } else {
    //       const imageSrc = webcamRef.current.getScreenshot();
    //       setWebCamVisibility(false);
    //       setImage(imageSrc);
    //       setError(false);
    //     }
    //   };
    // const ImgUpload = ({ onChange, src }) =>
    //     <label htmlFor="photo-upload" className="custom-file-upload fas">
    //         <div className="img-wrap img-upload" >
    //             <img htmlFor="photo-upload" src={src} />
    //         </div>
    //         <input id="photo-upload" type="file" onChange={onChange} />
    //     </label>

    // const Profile = ({ onSubmit, src, }) =>
    //     <form onSubmit={onSubmit}>
    //         <label className="custom-file-upload fas">
    //             <div className="img-wrap" >
    //                 <img htmlFor="photo-upload" src={src} />
    //             </div>
    //         </label>
    //         <button type="submit" className="edit">Edit Profile </button>
    //     </form>


    // const [profileState, setProfileState] = useState({
    //     file: '',
    //     imagePreviewUrl: 'https://cdn0.iconfinder.com/data/icons/actions-ono-system-core/30/account_circle-profile-profile_picture-default_picture-512.png',
    //     active: 'edit'
    // })

    // const photoUpload = e => {
    //     e.preventDefault();
    //     const reader = new FileReader();
    //     const file = e.target.files[0];
    //     reader.onloadend = () => {
    //         setProfileState({
    //             ...profileState,
    //             file: file,
    //             imagePreviewUrl: reader.result
    //         });
    //     }
    //     reader.readAsDataURL(file);
    // }


    // const handleSubmit = e => {
    //     e.preventDefault();
    //     let activeP = profileState.active === 'edit' ? 'profile' : 'edit';
    //     setProfileState({
    //         ...profileState,
    //         active: activeP,
    //     })
    // }





    return (<>
        <ButtonAppBar />
        <div className="profile-div">
            <p>{authBusinessDetails.userName}</p>
            <p>{authBusinessDetails.email}</p>
            {/* {(profileState.active === 'edit') ? (
                <ImgUpload onChange={photoUpload} src={profileState.imagePreviewUrl} />
            ) : (
                <Profile
                    onSubmit={handleSubmit}
                    src={profileState.imagePreviewUrl}
                />)} */}

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
                <div> <p>Tell us about yourself:</p>
                    <textarea rows={7} cols={40} placeholder="About me" />
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