const Controller = {};

const admin = require("firebase-admin");
const serviceAccount = require("../../.podo.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://podo-wallet-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Realtime Database 참조 가져오기
const db = admin.database();
const accountsRef = db.ref('Accounts');
const domainsRef = db.ref('Domains');
const LogRef = db.ref('Log');


// GET 요청 테스트
Controller.getIndex = (req, res) => {
  res.status(200).send({ data: 'Hello World!' });
  // 데이터 가져오기
  accountsRef.once('value', (snapshot) => {
    const accounts = snapshot.val();
    console.log("Accounts 전체 가져오기");
    console.log(accounts);
  });
  // 0x0000000에 해당하는 데이터 가져오기
  accountsRef.child('0x0000000').once('value', (snapshot) => {
  const data = snapshot.val();
  console.log("0x0000000만 가져오기");
  console.log(data);
});
};

// POST 요청 테스트
Controller.postUppercase = (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400).send('Bad Request');
    return
  }

  const uppercased = text.toUpperCase();

  res.status(200).send({ data: uppercased });

  const newAccount = {
    description: '설명2',
    isEOA: true,
    risk: 3
  };

  accountsRef.child('0x0000002').set(newAccount, (error) => {
    if (error) {
      console.log('Failed to add new account:', error);
    } else {
      console.log('New account added successfully!');
    }
  });
};


module.exports = Controller;