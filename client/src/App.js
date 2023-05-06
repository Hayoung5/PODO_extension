import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactDOM from "react-dom";
import { Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Transfer from "./components/Transfer";
import MyAccount from "./components/MyAccount";
import Report from "./pages/Report";
import ResultNormal from "./pages/ResultNormal";
import ResultWarning from "./pages/ResultWarning";
import ResultScam from "./pages/ResultScam";
// import SignTransaction from "./components/SignTransaction";

const App = () => {
  	const [wallet, setWallet] = useState({});
  	console.log("hello word!");
	
	return (
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route 
					path="/login" 
					element={<Login setWallet = {setWallet}/>}
				/>
				<Route path="/search" element={<Search />} />
				<Route path="/transfer" element={<Transfer wallet = {wallet} />} 
        		/>
				<Route path="/myaccount" element={<MyAccount />} />
				<Route path="/report" element={<Report />} />
				<Route path="/resultnormal" element={<ResultNormal />} />
				<Route path="/resultwarning" element={<ResultWarning />} />
				<Route path="/resultscam" element={<ResultScam />} />
				{/* <Route path="/signtransaction" element={<SignTransaction />} /> */}
				{/* <Route path="/findmnemonic" element={<FindMnemonic />} /> */}
			</Routes>
	);
};

export default App;