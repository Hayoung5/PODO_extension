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

export const getLogs = async () => {
  return await axios.get(`${config.apiBaseUrl}/logs`)
    .then(response => {
      return response.data.logs;
    })
    .catch(error => {
      console.error(error);
    });
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
  const data = {
    "account" : account,
  };
  
  try {
    const response = await axios.get(`${config.apiBaseUrl}/searchAccount`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchDomain = async (domain) => {
  const data = {
    "domain" : domain,
  };
  
  try {
    const response = await axios.get(`${config.apiBaseUrl}/searchDomain`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const examineTx = async(tx) => {
  const data = { "tx" : JSON.stringify(tx) };
    try {
    const response = await axios.post(`${config.apiBaseUrl}/examineTx`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}