import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactDOM from "react-dom";
import { Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Transfer from "./components/Transfer";
import MyAccount from "./components/MyAccount";
import SearchResult from "./pages/SearchResult";
import Report from "./pages/Report"
// import SignTransaction from "./components/SignTransaction";

const App = () => {
  	const [wallet, setWallet] = useState({});
	const [inputValue, setInputValue] = useState("");
	const [isURL, setIsURL] = useState(false);
  	console.log("hello word!");
	
	return (
			<Routes>
				<Route path="/*" element={<Home setInputValue = {setInputValue} setIsURL = {setIsURL} />} />
				<Route 
					path="/login" 
					element={<Login setWallet = {setWallet}/>}
				/>
				<Route path="/searchResult" element={<SearchResult inputValue = {inputValue} isURL = {isURL} />} />
				<Route path="/transfer" element={<Transfer wallet = {wallet} />} 
        		/>
				<Route path="/myaccount" element={<MyAccount />} />
				<Route path="/report" element={<Report /> } />
				{/* <Route path="/signtransaction" element={<SignTransaction />} /> */}
				{/* <Route path="/findmnemonic" element={<FindMnemonic />} /> */}
			</Routes>
	);
};

export default App;