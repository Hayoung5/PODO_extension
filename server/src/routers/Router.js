const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller');

router.get('/', Controller.getIndex);
router.post('/uppercase', Controller.postUppercase);


module.exports = router;