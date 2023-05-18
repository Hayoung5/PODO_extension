/*global chrome*/

import React, { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

const ConnectAddress = () => {
    const [input, setIntput] = useState();
    useEffect(() => {
		chrome.storage.local.get("msg", (res) => {
            if(res.msg){
				setIntput(res.msg.params[0].to);
                console.log(res.msg.params[0].to);
			};
		});
	}, [input]);

    return (
        <div>
        {input ?
            <SearchResult inputValue={input} isURL={false} />
            : <div/>
        }
        </div>
    );
};

export default ConnectAddress;