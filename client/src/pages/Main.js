import React, { useState, useEffect, useInsertionEffect } from 'react';
import { createAccount } from '../utils/utils';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CryptoJS from 'crypto-js';
const lightwallet = require("eth-lightwallet");

function Main() {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [address, setAddress] = useState('');


    useInsertionEffect(() => {;
    },[])
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handlePasswordChange2 = (event) => {
        setPassword2(event.target.value);
    };

    const handleCreateAccount = () => {
        createAccount(password).then((address) => {setAddress(address);});
    };

    const handleLoginAccount = () => {
        const userKeystore = localStorage.getItem('encryptedKeystore');
        console.log(userKeystore);

    };
  
    return (
      <div>
        <div>{"계정 만들기"}</div>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button onClick={handleCreateAccount}>Create Account</button>
        {address && (
            <div>
                <div> Address: {address} </div>
            </div>
        )}
        <div>{"암호화된 키스토어 확인"}</div>
        <button onClick={handleLoginAccount}>check</button>
      </div>
    );
}

export default Main;