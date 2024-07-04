import React, { useState, useContext } from "react";
import EnumSelect from "../EnumSelect";
import { FormInputs } from "../formInputs";
import { APIrequests } from '../../APIrequests';
import { useForm } from "react-hook-form";
import PriceOffersList from "../priceOffers";
import './BusinessForm.css'

export default function BusinessForm() {
    const APIrequest = new APIrequests()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const { register: savePrice, handleSubmit: handleSubmitPrice, formState: { errors: priceErrors }, resetPrice } = useForm({
        defaultValues: {
            amount: '',
            description: '',
        }
    })
    const locations = JSON.parse(localStorage.getItem("locations"))
    const categories = JSON.parse(localStorage.getItem("categories"))
    const [location, setLocation] = useState();
    const [category, setCategory] = useState();
    const [priceOffers, setPriceOffers] = useState([])
    const handleLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleCategories = (event) => {
        setCategory(event.target.value);
    };

    const addPrice = (priceDetails) => {
        if (priceOffers.length == 4) {
            alert("You have used the amount of offers available to you")
        }
        setPriceOffers([...priceOffers, priceDetails])
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
    const ImgUpload = ({ onChange, src }) =>
        <label htmlFor="photo-upload" className="custom-file-upload fas">
            <div className="img-wrap img-upload" >
                <img htmlFor="photo-upload" src={src} />
            </div>
            <input id="photo-upload" type="file" onChange={onChange} />
        </label>

    const Profile = ({ onSubmit, src, }) =>
        <form onSubmit={onSubmit}>
            <label className="custom-file-upload fas">
                <div className="img-wrap" >
                    <img htmlFor="photo-upload" src={src} />
                </div>
            </label>
            <button type="submit" className="edit">Edit Profile </button>
        </form>


    const [profileState, setProfileState] = useState({
        file: '',
        imagePreviewUrl: 'https://cdn0.iconfinder.com/data/icons/actions-ono-system-core/30/account_circle-profile-profile_picture-default_picture-512.png',
        active: 'edit'
    })

    const photoUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setProfileState({
                ...profileState,
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
    }


    // const handleSubmit = e => {
    //     e.preventDefault();
    //     let activeP = profileState.active === 'edit' ? 'profile' : 'edit';
    //     setProfileState({
    //         ...profileState,
    //         active: activeP,
    //     })
    // }





    return (<>
        <div className="profile-div">
            {(profileState.active === 'edit') ? (
                <ImgUpload onChange={photoUpload} src={profileState.imagePreviewUrl} />
            ) : (
                <Profile
                    onSubmit={handleSubmit}
                    src={profileState.imagePreviewUrl}
                />)}

        </div>
        <div className='forms-container'><form className="businessForn" style={{ textAlign: "center" }}>
            <div> <p>Personal Information:</p>
                <EnumSelect value={category} currentEnum="category"
                    enumValues={categories} handleChange={handleCategories} />
                <EnumSelect value={location} currentEnum="location"
                    enumValues={locations} handleChange={handleLocation} />
                <br /> <FormInputs.phoneInput register={register} errors={errors} />
            </div>
            <div> <p>Tell us about yourself:</p>
                <textarea rows={7} cols={40} placeholder="About me" />
            </div>
            <FormInputs.passwordInput register={register} errors={errors} />
        </form >
            <div><p>Price Offers:</p>
                {priceOffers.length < 5 && <form className="price-form" onSubmit={handleSubmitPrice(addPrice)}>
                    <FormInputs.amountInput register={savePrice} errors={priceErrors} />
                    <FormInputs.descriptionInput register={savePrice} errors={priceErrors} />
                    <button type='submit'>Add</button></form>}
                <PriceOffersList priceOffers={priceOffers} setPriceOffers={setPriceOffers} />
            </div></div></>)
}