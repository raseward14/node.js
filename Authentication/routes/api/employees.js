const express = require('express');
const router = express.Router();
// just for this tutorial, importing json data
const employeesController = require('../../controllers/employeesController');

// we can create the route, and chain the http methods we want to provide for this route
router.route('/')
// will go through the middleware first, then go to the controller
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

// can have a parameter directly within the URL
router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;