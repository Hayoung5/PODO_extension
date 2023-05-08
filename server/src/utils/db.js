const admin = require("firebase-admin");
const serviceAccount = require("../../.podo.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://podo-wallet-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Realtime Database 참조 가져오기
module.exports = admin.database();