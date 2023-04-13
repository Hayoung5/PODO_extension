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


export const postText = async (text) => {
  const data = { "text" : text };
  try {
    const response = await axios.post(`${config.apiBaseUrl}/uppercase`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};