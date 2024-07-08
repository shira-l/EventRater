import React, { createContext, useState,useEffect } from 'react';
import { APIrequests } from '../APIrequests';
export const EnumContext = createContext();

const EnumsProvider = ({ children }) => {

    const saveInLocalStorage = async (myEnum) => {
        const enunData = await getEnum(myEnum);
        localStorage.setItem(myEnum, JSON.stringify(enunData));
        return enunData;
    }

    const getEnum = async (myEnum) => {
        try {
            const APIrequest = new APIrequests()
            const response = await APIrequest.getRequest(`/enums/${myEnum}`)
            console.log(response)
            return response.data
        }
        catch (error) {
            console.error(error.message)
        }
    }
    const locations = localStorage.getItem("locations")?JSON.parse(localStorage.getItem("locations")): saveInLocalStorage("locations")
    const categories = localStorage.getItem("categories")?JSON.parse(localStorage.getItem("categories")): saveInLocalStorage("categories")

    return (
        <EnumContext.Provider value={{ locations, categories }}>
            {children}
        </EnumContext.Provider>
    );
};

export default EnumsProvider;
