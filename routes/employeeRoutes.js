const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route to get all employees
router.get('/employees', employeeController.getEmployees);

module.exports = router;
