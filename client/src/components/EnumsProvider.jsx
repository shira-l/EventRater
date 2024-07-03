import React, { createContext, useState } from 'react';
import { APIrequests } from '../APIrequests';
export const EnumContext = createContext();

const EnumsProvider = ({ children }) => {
  const APIrequest = new APIrequests()
  const getEnum = async (myEnum) => {
    try {
      const response = await APIrequest.getRequest(`enums/${myEnum}`)
      const json = await response.json()
      if (!response.ok)
        console.error(json.message)
      else
        return json.data
    }
    catch (error) {
      console.error(error.message)
    }
  }
 const locations=getEnum("locations");
 const categories=getEnum("categories");

  return (
    <EnumContext.Provider value={{ locations, categories }}>
      {children}
    </EnumContext.Provider>
  );
};

export default EnumsProvider;
