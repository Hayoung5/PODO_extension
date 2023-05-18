/*global chrome*/

import React, { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

const ConnectAddress = () => {
    const [input, setIntput] = useState();
    useEffect(() => {
		chrome.storage.local.get("msg", (res) => {
            if(res.msg){
				setIntput(res.msg.params[0].to);
			};
		});
	}, []);

    return (
        <div>
        {<SearchResult inputValue={input} isURL={false} />}
        </div>
    );
};

export default ConnectAddress;