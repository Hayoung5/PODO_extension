
 

import React, { useEffect, useState } from "react";
import "./App.css";
import * as ReactDOM from "react-dom";
import { Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Content from "./pages/Content";
import Login from "./pages/Login";
import Create from "./pages/Create";
import Account from "./components/Account";
import TokenList from "./components/TokenList";
import Transfer from "./components/Transfer";
import MyAccount from "./components/MyAccount";
import ShowMnemonic from "./components/ShowMnemonic";
import InitAccount from "./components/InitAccount";
// import SignTransaction from "./components/SignTransaction";

const App = () => {
  const [wallet, setWallet] = useState({});
  console.log("hello word!");
	return (
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/login" element={<Login 
          wallet = {wallet}
          setWallet = {setWallet}
        />} />
				<Route path="/create" element={<Create />} 
          wallet = {wallet}
          setWallet = {setWallet}
        />
				<Route path="/content" element={<Content />} />
				<Route path="/account" element={<Account />} />
				<Route path="/tokenlist" element={<TokenList />} />
				<Route path="/transfer" element={<Transfer />} 
          wallet = {wallet}
        />
				<Route path="/myaccount" element={<MyAccount />} />
				<Route path="/showmnemonic" element={<ShowMnemonic />} />
				<Route path="/initaccount" element={<InitAccount />} />
				{/* <Route path="/signtransaction" element={<SignTransaction />} /> */}
				{/* <Route path="/findmnemonic" element={<FindMnemonic />} /> */}
			</Routes>
	);
};

export default App;