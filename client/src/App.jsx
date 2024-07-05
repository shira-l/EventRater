import { useState,useEffect } from 'react'
import Home from './components/Home/Home.jsx'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import Businesses from './components/business/Businesses.jsx'
// import Business from './components/business/Business.jsx'
import Business from './components/business/Business.jsx'
import BusinessRegister from './components/business/BusinessRegister.jsx';
import { APIrequests } from './APIrequests.js';
import PersonalArea from './components/business/PersonalArea.jsx';
import BusinessLogin from './components/business/BusinessLogin.jsx';
// import {Route, Router} from 'react-dom';


function App() {

  useEffect(() => {
    if (localStorage.getItem("locations"))
      saveInLocalStorage("locations")
    if (localStorage.getItem("categories"))
      saveInLocalStorage("categories")
  }, [])
  const saveInLocalStorage = async (myEnum) => {
    const enunData = await getEnum(myEnum);
    localStorage.setItem(myEnum, JSON.stringify(enunData));
  }

  const getEnum = async (myEnum) => {
    try {
      const APIrequest=new APIrequests()
      const response = await APIrequest.getRequest(`/enums/${myEnum}`)
      return response.data
    }
    catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="businesses">
            <Route index element={<Businesses />} />
            <Route path=':idBusiness' element={<Business />} />
            <Route path='register' element={<BusinessRegister />} />
            <Route path='login' element={<BusinessLogin />} />
            <Route path='personal-area' element={<PersonalArea />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
