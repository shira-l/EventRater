import React, { useState, useContext } from "react";
import { EnumContext } from "../EnumsProvider";
import EnumSelect from "../EnumSelect";
export default function BusinessForm() {
    const { locations, categories } = useContext(EnumContext);
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
        <textarea placeholder="About me"></textarea>
    </>)
}