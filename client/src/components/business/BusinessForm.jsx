import React, { useState, useContext } from "react";
import EnumSelect from "../EnumSelect";
import { FormInputs } from "../FormInputs";
import CryptoJS from 'crypto-js';
import { APIrequests } from '../../APIrequests';
import { useForm } from "react-hook-form";


export default function BusinessForm() {
    const APIrequest = new APIrequests()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const locations = JSON.parse(localStorage.getItem("locations"))
    const categories = JSON.parse(localStorage.getItem("categories"))
    const [location, setLocation] = useState();
    const [category, setCategory] = useState()
    const handleLocation = (event) => {
        setLocation(event.target.value);
    };
    const handleCategories = (event) => {
        setCategory(event.target.value);
    };


    return (<>
        <EnumSelect value={category} currentEnum="category"
            enumValues={categories} handleChange={handleCategories} />
        <EnumSelect value={location} currentEnum="location"
            enumValues={locations} handleChange={handleLocation} />
        <br />
        <textarea rows={5} cols={30} placeholder="About me" />
        <br />
        <FormInputs.phoneInput register={register} />
        <br />
        <FormInputs.passwordInput register={register} errors={errors} />
    </>)
}