const Employee = require('../models/employeeModel');

// Function to seed the database with an employee for testing
async function seedDatabase() {
    const count = await Employee.countDocuments();
    if (count === 0) { // Seed only if the collection is empty
        const employee = new Employee({
            name: 'John Doe',
            macAddress: '00:1A:2B:3C:4D:5E',
            status: 'inactive',
            lastSeen: null
        }); 
        await employee.save();
        console.log('Sample employee document added to database');
    } else {
        console.log('Employee database already seeded.');
    }
}

// Function to get all employees
async function getEmployees(req, res) {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving employees' });
    }
}

// Export functions
module.exports = {
    seedDatabase,
    getEmployees
};
