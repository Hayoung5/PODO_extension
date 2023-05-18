/*global chrome*/
import React, { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

const ConnectDomain = () => {
    const [input, setIntput] = useState();
    useEffect(() => {
		chrome.storage.local.get("location", (res) => {
            if(res.location){
				setIntput(res.location);
			};
		});
	}, []);

    return (
        <div>
        {<SearchResult inputValue={input} isURL={true} />}
        </div>
    );
};

export default ConnectDomain;