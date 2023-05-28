## PODO extension

This project is for KAIST web3 class.
The PODO extension is web3 beginner-friendly and provided in chrome extension format.


# **PODO**(**P**rotecting **O**ur **D**igital **O**wnership)

---

![스크린샷 2023-05-23 오후 3.11.33.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d4c1c8dd-1e00-4d57-aa40-a8b584cb4a7c/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-23_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.11.33.png)

**PODO의 목표는 모두에게 안전한 Web3 경험을 보장하는 것입니다.**

PODO는 여러가지 scam 유형을 분석하여 초보자 부터 Web3에 이미 익숙한 사용자까지 안전하게 거래를 진행할 수 있도록 다양한 솔루션을 제공합니다.

연결된 암호화폐 지갑이 없어도 PODO의 포괄적인 기능을 활용할 수 있습니다. PODO는 거래하고자하는 계정(EOA, CA)이나 도메인 주소, 트랜잭션에 대한 위험도를 종합적으로 평가한 정보를 제공해 줍니다.

PODO는 크롬 익스텐션 형태로 구현되어 구동중인 디앱 사이트나 사용중인 지갑의 종류와 무관하게 사용할 수 있는 넓은 범용성을 지니고, 별다른 조작 없이도 자동으로 사용자의 거래를 분석하여 안전 거래를 도와줍니다.

PODO는 사용자가 사기 사례를 직접 보고하여 PODO의 안전에 기여할 수 있도록 합니다. 이러한 협력적 접근 방식은 보다 안전하고 신뢰할 수 있는 Web3 생태계를 조성합니다.

# Services

---

### 계정(EOA, CA) 조회

- 신고 내역, 피해금액, 컨트랙트 verify 여부 등의 정보 제공
- 상기 내용 종합하여 등급화된 위험도 제공

### 디앱 웹사이트 도메인 조회

- 하기 내용 종합하여 위험도를 등급화하여 제공
- 상기 내용 종합하여 등급화된 위험도 제공

### 사기거래 등록

- 피해 종류 선택, 직접 입력 기능
- 연결된 주소 가져오기 기능
- 사기거래 txhash 입력 기능 (피해 금액 자동 추산)
- 사기거래 등록 취소 기능

### 트랜잭션 분석

- 서명전 트랜잭션 전송 발생시 자동으로 분석하여 결과창 팝업
- 웹페이지 도메인 주소, 계정, raw 트랜잭션 분석한 종합 결과 제공

# Installation

---

- **크롬 익스텐션 업로드 방법**
    
    ![chrome_extension사용법.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96889335-4492-4589-becc-467fea32175f/chrome_extension%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8.gif)
    

git clone & 클라이언트 폴더 접속하기

```bash
$ git clone https://github.com/Hayoung5/PODO_extension
$ cd PODO_extension/client
```

dependency 설치하기 & 빌드

```bash
$ npm i
$ npm run build
```

크롬 실행 후 chrome://extensions 접속 & Load unpacked 클릭

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/640d6267-f750-493f-b076-2613f20db092/Untitled.png)

client 폴더에서 build 폴더를 선택

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/afd82e33-5766-4407-ad1c-b3cb7e0b796b/Untitled.png)

로드된 익스텐션 확인

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1d245ca4-d713-49f9-ac10-801a88be35f1/Untitled.png)

- **서버 실행 방법**
    
    git clone & 클라이언트 폴더 접속하기
    

서버 폴더 접속 & dependency 설치

```bash
$ cd server
$ npm i
```

server 폴더에 `.env` 파일 만들고 Alchemy API 및 Etherscan API 키 입력

```bash
server/.env

PORT=3000
ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
```

`.podo.json` 파일 만들고 Google Firebase 비공개 admin key를 입력

```bash
server/.podo.json

{
    "type": "service_account",
    "project_id": ...
}
```

Express 서버 실행하기

```bash
node index.js
```

# Usage

---

- ✅ **메타마스크 연결**
    
    ![메타마스크_연결.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3209c264-f955-4110-98ec-960c39b3c45a/%E1%84%86%E1%85%A6%E1%84%90%E1%85%A1%E1%84%86%E1%85%A1%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3_%E1%84%8B%E1%85%A7%E1%86%AB%E1%84%80%E1%85%A7%E1%86%AF.gif)
    
- ✅ **도메인 검색 (결과: 노말)**
    
    ![도메인검색_노멀.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/800d5943-0695-407c-ab73-da22b43ce19d/%E1%84%83%E1%85%A9%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8_%E1%84%82%E1%85%A9%E1%84%86%E1%85%A5%E1%86%AF.gif)
    
- ✅ **트랜잭션 검사 (결과: 노말)**
    
    ![트랜잭션_검사_노말.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/683c623b-4473-4597-9996-c3b2e4c5f527/%E1%84%90%E1%85%B3%E1%84%85%E1%85%A2%E1%86%AB%E1%84%8C%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A1_%E1%84%82%E1%85%A9%E1%84%86%E1%85%A1%E1%86%AF.gif)
    
- 🚨 **트랜잭션 검사 (결과: 위험)**
    
    (용량문제..)
    
- ✅ **신고하기 기능 (CA, 해시값 및 피해금액 있음)**
    
    ![신고등록.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/feb17e45-3f98-4e50-add7-8b1c1dacd8f5/%E1%84%89%E1%85%B5%E1%86%AB%E1%84%80%E1%85%A9%E1%84%83%E1%85%B3%E1%86%BC%E1%84%85%E1%85%A9%E1%86%A8.gif)
    
- ✅ **CA 주소 검색 (결과: 위험, 피해금액 보임)**
    
    ![CA주소검색.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f3c8c558-b0d0-4ffd-9641-bdd73ac34b25/CA%E1%84%8C%E1%85%AE%E1%84%89%E1%85%A9%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8.gif)
    
- ✅ **MY Page에서 신고내역 확인 및 삭제**
    
    ![마이페이지.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4b86d739-3f39-4fa1-b572-a454f0286aa2/%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5.gif)
    

ppt용 스샷(우리 포도 앱 영역만 보이도록)

- **도메인 검색 (노말, 주의, 위험)**
    
    ![스크린샷 2023-05-25 오전 10.47.36.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/32f77bb9-2ebc-46b0-8ef5-4e97d1aace39/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.47.36.png)
    
    ![스크린샷 2023-05-25 오전 11.03.10.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0176a198-1101-476e-b511-453037ffb393/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.03.10.png)
    
    ![스크린샷 2023-05-25 오전 11.23.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7d1a1913-e4af-4eca-80fb-8367ab54c5d1/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.23.20.png)
    
- **주소 검색 (노말, 주의, 위험) EOA,CA 따로 구분 안하고 아무거나**
    
    ![스크린샷 2023-05-24 오후 11.27.19.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e5b32b3-cb8a-4d21-89d8-a112ea6f3e67/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-24_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_11.27.19.png)
    
    ![스크린샷 2023-05-25 오전 11.06.51.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c11ae2aa-b742-4290-bee2-3efbb56750b6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.06.51.png)
    
    ![스크린샷 2023-05-25 오후 5.16.42.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f4f7dd46-4907-4e48-b670-dd7efe822892/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-25_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.16.42.png)
    
    ![스크린샷 2023-05-25 오전 11.24.18.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/865149cb-ec8e-4ec7-842c-4fbd36110f39/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.24.18.png)
    

# Tech Stack

---

### Front end

- Chrome-Extension
- React
- React-Router-Dom
- React-Hooks
- Axios
- modern css
- Mui design library

### Back end

- Node.js
- Express
- Firebase realtime DB
- Release : Google Cloud Platform

### Blockchain

- Ethers.js
- Alchemy API
- Etherscan API

# Architecture

---

### Mockup

![스크린샷 2023-05-23 오후 4.13.50.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f8a8be72-7a16-4f4a-a471-c9f8b3143b93/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-23_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.13.50.png)

### DB schema

![스크린샷 2023-05-23 오후 5.21.08.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ecea155-d5e1-4834-acee-864db14cd127/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-23_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.21.08.png)

![스크린샷 2023-05-23 오후 5.20.55.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e32bbac0-9b75-4add-8957-16a320ad8ec2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-23_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.20.55.png)

### Sequence Diagram

![스크린샷 2023-05-25 오전 10.16.06.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/82bdd363-b22a-4f30-8523-8f3762b3718d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.16.06.png)

### Server API

- https://github.com/Hayoung5/PODO_wallet/tree/main/server README 참고

### PODO Risk Standard

![스크린샷 2023-05-26 오후 3.20.17.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a72c5682-f221-482f-b0aa-632cb2161272/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-05-26_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.20.17.png)

# Files

---

### client 디렉터리 구조 및 주요 파일 설명

```bash
**client**
├── README.md
├── build            // 이 폴더는 깃허브에 제공되지 않습니다. (npm run build 시 자동 생성)
├── config-overrides.js
├── node_modules     // 이 폴더는 깃허브에 제공되지 않습니다. (npm install 시 자동 생성)
├── package-lock.json
├── package.json
├── public
└── src
		├── APIs
		│   ├── serverAPI.js     // 서버에 보내는 요청 정의
		│   └── walletAPI.js     // 메타마스크 연결 정의
		├── App.js               // 페이지 분기 정의
		├── ...
		├── assets
		│   └── ...
		├── components           // 컴포넌트 정의
		│   ├── AccountPart.js
		│   ├── DomainPart.js
		│   ├── EmojiPart.js
		│   ├── HistoryModal.js
		│   ├── Navbar.js
		│   ├── ResultNormal.js
		│   ├── ResultScam.js
		│   ├── ResultWarning.js
		│   └── TxPart.js
		├── ...
		├── index.js
		├── pages               // 페이지 정의
		│   ├── ExamineTx.js
		│   ├── Home.js
		│   ├── Loading.js
		│   ├── Mypage.js
		│   ├── Report.js
		│   └── SearchResult.js
		├── ...
		├── styles
		│   ├── style.js
		│   └── styles.css
		└── utils
		    └── utils.js        // 다양한 util 함수 정의
```

### server 디렉터리 구조 및 주요 파일 설명

```bash
**server**
├── README.md
├── index.js                // 웹 서버를 구성 (CORS,JSON 파싱,라우팅을 설정)
├── node_modules            // 이 폴더는 깃허브에 제공되지 않습니다. (npm install 시 자동 생성)
├── package-lock.json
├── package.json
└── src
		├── controllers
		│   └── Controller.js   // server controller 정의
		├── routers
		│   └── Router.js       // router controller 정의
		└── utils
		    ├── alchemy.js      // alchemy-sdk 활용하여 damegeAmount 계산 함수 정의
		    ├── db.js           // Realtime Database 참조 가져오기
		    ├── etherscan.js    // 이더스캔 API 활용하여 컨트랙트, verify 판단 함수 정의
		    ├── reports.js      // 신고 관련 함수 정의
		    └── utils.js        // util 함수 정의
```

## Reference

---

## PODO team

---

**송원호 (Wonho Song)**

- Back-end Development
- KAIST CS undergraduate
- Contact: siinarette@gmail.com

**이규민 (Gyumin Lee)**

- Product Planning, Design
- Hongik Univ. Design Management
- Contact : happy@g.hongik.ac.kr

**오하영 (Hayoung Oh)**

- Front-end/ Back-end Development
- Junior Blockchain Engineer
- Contact : dalja@gmail.com
