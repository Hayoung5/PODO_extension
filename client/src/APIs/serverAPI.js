import axios from 'axios';
import config from '../config';

export const getGreeting = async () => {
  return await axios.get(`${config.apiBaseUrl}/`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

export const getLogs = async (account) => {
  const data = { params : {
    "reporter" : account,
  }};
  
  try {
    const response = await axios.get(`${config.apiBaseUrl}/logs`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const postReport = async (reporter, content, domain, reportedAddr, txHash) => {
  const data = {
    "address" : reportedAddr,
    "associatedTx" : txHash,
    "content" : content,
    "domain" : domain,
    "reporter" : reporter,
    "timestamp" : Math.floor(Date.now() / 1000),
  };
  
  try {
    const response = await axios.post(`${config.apiBaseUrl}/report`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchAccount = async (account) => {
  const data = { params : {
    "address" : account,
  }};
  
  try {
    const response = await axios.get(`${config.apiBaseUrl}/addressInfo`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchDomain = async (domain) => {
  const data = { params : {
    "domain" : domain,
  }};
  
  try {
    const response = await axios.get(`${config.apiBaseUrl}/domainInfo`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const examineTx = async(tx) => {
  const data = { params : {
    "tx" : tx,
  }};
    try {
    const response = await axios.get(`${config.apiBaseUrl}/examineTx`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}