const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller');

router.get('/', Controller.getIndex);
router.get('/logs', Controller.getLogs);
router.post('/uppercase', Controller.postUppercase);
router.post('/examineTx', Controller.postExamineTx);
router.post('/report', Controller.postReport);


module.exports = router;