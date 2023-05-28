# PODO (Protect Our Digital Ownership)

<center>
    <img width=1000 src="https://github.com/Hayoung5/PODO_extension/assets/104472372/47a14276-d3b4-468a-a370-c8b5fff3ea9a" />
</center>


<br>

<h3>PODO의 목표는 모두에게 안전한 Web3 경험을 보장하는 것입니다.</h3>

<br>

PODO는 여러가지 scam 유형을 분석하여 초보자 부터 Web3에 이미 익숙한 사용자까지 안전하게 거래를 진행할 수 있도록 다양한 솔루션을 제공합니다.

연결된 암호화폐 지갑이 없어도 PODO의 포괄적인 기능을 활용할 수 있습니다. PODO는 거래하고자하는 계정(EOA, CA)이나 도메인 주소, 트랜잭션에 대한 위험도를 종합적으로 평가한 정보를 제공해 줍니다.

PODO는 크롬 익스텐션 형태로 구현되어 구동중인 디앱 사이트나 사용중인 지갑의 종류와 무관하게 사용할 수 있는 넓은 범용성을 지니고, 별다른 조작 없이도 자동으로 사용자의 거래를 분석하여 안전 거래를 도와줍니다.

PODO는 사용자가 사기 사례를 직접 보고하여 PODO의 안전에 기여할 수 있도록 합니다. 이러한 협력적 접근 방식은 보다 안전하고 신뢰할 수 있는 Web3 생태계를 조성합니다.


  
<br>


# Services


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



  
<br>



# Installation

### client 실행 방법
    

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


<center>
    <img width=600 src="https://github.com/Hayoung5/PODO_extension/assets/104472372/6d3ed4dd-34e9-427c-89b0-99da42684e8a" />
</center>


client 폴더에서 build 폴더를 선택
  

<center>
    <img width=600 src="https://github.com/Hayoung5/PODO_extension/assets/104472372/c3c1e244-b4fd-44a0-88b3-a05c9787b046" />
</center>
  

로드된 익스텐션 확인
  

<center>
    <img width=600 src="https://github.com/Hayoung5/PODO_extension/assets/104472372/8cba559b-4d4f-4d58-a8d5-96e8f2028588" />
</center>

  
<br>


<details>
<summary>크롬 익스텐션 업로드 방법(영상)</summary>
<div markdown="1">       

![chrome_extension사용법](https://github.com/Hayoung5/PODO_extension/assets/104472372/15d8d833-db29-4a5f-baf2-2e296f8275e2)

</div>
</details>



### server 실행 방법

**PODO server는 google cloud platform에 배포 되어 별다른 서버 실행이 필요하지 않습니다.**
**PODO serve를 로컬에서 실행하고 싶으신 경우, 아래 설명을 따라 주세요.**


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


  
<br>



# Usage

아래 토글을 클릭하면 PODO 기능 작동 영상을 확인하실 수 있습니다.

<details>
<summary>메타마스크 연결</summary>
<div markdown="1">       

![메타마스크_연결](https://github.com/Hayoung5/PODO_extension/assets/104472372/c8499ece-9277-4cdd-a5e8-37d283db3b52)

</div>
</details>


<details>
<summary>도메인 검색</summary>
<div markdown="1">       
	
![도메인검색_노멀](https://github.com/Hayoung5/PODO_extension/assets/104472372/87ccd947-3762-4a1c-b715-f653a1086c08)

</div>
</details>


    
<details>
<summary>계정 검색</summary>
<div markdown="1">       

![CA주소검색](https://github.com/Hayoung5/PODO_extension/assets/104472372/2c3a22ab-43fd-4bdb-85f2-d15ed7d8e412)

</div>
</details>




<details>
<summary>트랜잭션 자동 검사</summary>
<div markdown="1">  
	
![트랜잭션_검사_노말](https://github.com/Hayoung5/PODO_extension/assets/104472372/cfad73a1-382d-49e4-bc03-bc899b0f2f49)

</div>
</details>



<details>
<summary>사기거래 신고 등록</summary>
<div markdown="1">       

![신고등록](https://github.com/Hayoung5/PODO_extension/assets/104472372/e249424e-77bb-4fcf-87bf-8dd6b75a3d73)

</div>
</details>


<details>
<summary>신고 등록 내역 조회 및 삭제</summary>
<div markdown="1">       

![마이페이지](https://github.com/Hayoung5/PODO_extension/assets/104472372/9948b641-1ffb-427d-b64e-4c3da9b9c20d)

</div>
</details>

  
<br>




# Tech Stack


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


  
<br>



# Files


### client 디렉터리 구조 및 주요 파일 설명

```bash
client
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
server
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



  
<br>



# PODO team


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
