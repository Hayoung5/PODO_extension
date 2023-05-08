const Controller = {};

const { txRisk, doReport } = require("../utils/utils");

const db = require('../utils/db.js')
const accountsRef = db.ref('Accounts');
const domainsRef = db.ref('Domains');
const LogRef = db.ref('Log');


// GET 요청 테스트
Controller.getIndex = (req, res) => {
  res.status(200).send({ data : 'Hello World!' });
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

  res.status(200).send({ uppercased });

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

// 로그 가져오기
Controller.getLogs = (req, res) => {
  // 데이터 가져오기
  LogRef.once('value', (snapshot) => {
    const logs = snapshot.val();
    console.log(logs);
    res.status(200).send({ logs });
  }, (error) => {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch logs' });
  });
};

// risk measures
// 0: whitelisted
// 1: standard
// 2: reported / unvalidated
// 3: blacklisted
Controller.postExamineTx = wrap(async (req, res) => {
  const tx = JSON.parse(req.body[0]);
  if(!tx) {
    res.status(400).send('Bad Request');
    return;
  }

  risk = await txRisk(tx);
  res.status(200).send({ risk: risk })
})

Controller.postReport = wrap(async (req, res) => {
  const report = JSON.parse(req.body[0]);
  if(!report) {
    res.status(400).send('Bad Request');
    return;
  }

  await doReport(report).catch( err => {
    console.log(err);
    res.status(400).send('Report Failed: ' + err);
    return;
  })

  res.status(200).send('Reported');
})

function wrap(fn) {
  return (async (req, res) => {
    try {
      return await fn(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }
  })
}

module.exports = Controller;