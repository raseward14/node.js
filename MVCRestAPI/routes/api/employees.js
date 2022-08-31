const express = require('express');
const router = express.Router();
// just for this tutorial, importing json data
const data = {};
data.employees = require('../../data/employees.json')

// we can create the route, and chain the http methods we want to provide for this route
router.route('/')
    .get((req, res) => {
        res.json(data.employees)
    })
    .post((req, res) => {
        // can refer to those parameters with req.body. whatever the name of the paramater is
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });

// can have a parameter directly within the URL
router.route('/:id')
    .get((req, res) => {
        // refer to the named parameter with req.params. whatever the name of the parameter is
        res.json({ "id": req.params.id });
    });
// 3:19:16

module.exports = router;