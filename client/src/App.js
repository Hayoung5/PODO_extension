import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactDOM from "react-dom";
import { Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Report from "./pages/Report"
import ExamineTx from "./pages/ExamineTx"
import Mypage from "./pages/Mypage";

const App = () => {
  	// const [wallet, setWallet] = useState({});
	const [inputValue, setInputValue] = useState("");
	const [isURL, setIsURL] = useState(false);
  	console.log("hello word!");
	
	return (
			<Routes>
				<Route path="/*" element={<Home setInputValue = {setInputValue} setIsURL = {setIsURL} />} />
				<Route path="/searchResult" element={<SearchResult inputValue = {inputValue} isURL = {isURL} />} />
				<Route path="/mypage" element={<Mypage />} />
				<Route path="/report" element={<Report /> } />
				<Route path="/tx" element={<ExamineTx /> } />
				{/* <Route path="/signtransaction" element={<SignTransaction />} /> */}
				{/* <Route path="/findmnemonic" element={<FindMnemonic />} /> */}
			</Routes>
	);
};

export default App;