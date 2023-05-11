// const lightwallet = require("eth-lightwallet");
// const CryptoJS = require('crypto-js');

//이 함수를 사용하여 다음과 같이 문자열이 유효한 URL인지 확인할 수 있습니다.
const isValidUrl = (input) => {
  try {
    new URL(input);
    return true;
  } catch (_) {
    return false;
  }
}

//console.log(isValidUrl("https://www.google.com")); // true
//console.log(isValidUrl("google.com")); // false

const isEthereumAddress = (str) => {
    return /^0x[0-9a-fA-F]{40}$/.test(str);
}

export const returnType = (address) => {
    if (address.startsWith('0x')){
        if (isEthereumAddress(address)) {
            return "ADDRESS"
        } else {
            return "INVALID ADDRESS";
        }
    } else {
        if (isValidUrl(address)) {
            return "URL";
        } else {
            return "INVALID URL";
        }
    }
}

export const returnDomain = (url) => {
        // Remove protocol (https:// or http://)
        let result = url.replace(/^(https?:\/\/)/, '');
    
      
        // Check if the URL ends with '/'
        const endsWithSlash = result.endsWith('/');
      
        // Remove trailing '/'
        if (endsWithSlash) {
          result = result.slice(0, -1);
        }
      
        return result;
};

export const shortenEthereumAddress = (address) => {
  const prefix = address.substring(0, 5);
  const suffix = address.substring(address.length - 4);
  
  // Return the shortened address
  return `${prefix}...${suffix}`;
};

export const convertUnixTime = (unixTime) => {
  const date = new Date(unixTime * 1000); // Unix 시간을 밀리초 단위로 변환하여 Date 객체 생성
  
  const year = date.getFullYear(); // 년도 가져오기
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
  const day = date.getDate(); // 일 가져오기
  const hour = date.getHours(); // 시간 가져오기
  const minute = date.getMinutes(); // 분 가져오기
  
  return (`${year}.${month}.${day} ${hour}:${minute}`);
}
