const express = require('express');
const router = express.Router();
const demoController = require('../controllers/Controller');
router.get('/demo', demoController.getDemoMessage);

module.exports = router;
