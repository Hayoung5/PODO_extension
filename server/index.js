const express = require('express');
const app = express();
const cors = require('cors'); // cors 모듈 로드
const bodyParser = require('body-parser');
const Router = require('./src/routers/Router');

require('dotenv').config();

app.use(cors()); // cors 미들웨어 등록
app.use(express.json());
app.use('/', Router);


app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);

});