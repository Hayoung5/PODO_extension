const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller');

router.get('/', Controller.getIndex);
router.get('/addressInfo', Controller.getAddressInfo);
router.get('/domainInfo', Controller.getDomainInfo);
router.get('/logs', Controller.getLogs);
router.get('/examineTx', Controller.getExamineTx);
router.post('/report', Controller.postReport);


module.exports = router;