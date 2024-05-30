import React from 'react'
import CryptoJS from 'crypto-js';
import { APIrequests } from '../APIrequests.js'
import { useState, useContext } from 'react'
import {Link
} from "react-router-dom";
import "../css/style.css";
import { UserContext } from '../UserProvider.jsx';

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { updateUserID } = useContext(UserContext);

  const generatePasswordHash = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword;
  };
  const hash_password = generatePasswordHash(password);

  async function login() {
    const response = await APIrequests.postRequest(`/login`, { "email": email, "password_hash": hash_password });
    if (!response.ok)
      throw new Error('error, please try egain whith anouther email or password or sign up')
    const data = response.json();
    localStorage.setItem("TOKEN", data.accessToken);

    getUser()
  }


  function getUser() {
    const token = localStorage.getItem('TOKEN');
    fetch(`http://localhost:8080/users?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok)
          throw new Error('ERROR: ' + response.status + ' ' + response.message)
        return response.json();
      })
      .then(data => {
        const currentUser = data[0];
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        updateUserID();
        navigate(`/user/${currentUser.id}/home`);
      }).catch(error => {
        alert(error.message);
      });
  }
  F
  return (
    <>
      <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <Link to="/register">New User?</Link>
    </>
  )
}

export default Login