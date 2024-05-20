const express = require('express');

const router = express.Router();
const adminController = require('../controllers/adminController');

// GET localhost:8080/admins - get all admins
router.get('/admins', adminController.index);

// POST localhost:8080/admins - create an admin
router.post('/admins', adminController.store);

// GET localhost:8080/admins/1234 - get an admin
router.get('/admins/:id', adminController.show);

// PUT localhost:8080/admins/1234 - Update an admin
router.put('/admins/:id', adminController.update);

// DELETE localhost:8080/admins/1234 - delete an admin
router.delete('/admins/:id', adminController.destroy);

module.exports = router;