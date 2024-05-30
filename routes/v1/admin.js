const express = require('express');

const router = express.Router();
const adminController = require('../../controllers/adminController');
const upload = require('../../middlewares/uploadFile');
const authorise = require('../../middlewares/authorise');

// Upload single image
router.put('/admins/upload', upload.single('avatar'), adminController.uploadProfile );
// Upload multiple images
// router.put('/admins/:id/upload',upload.array('avatar'), adminController.uploadProfile );

// GET localhost:8080/api/v1/admins?page=1&limit=5 
// Get all admins by Pagination
router.get('/admins', adminController.index);
// router.get('/admins', authorise(false, "user"), adminController.index);

// POST localhost:8080/api/v1/admins - create an admin
router.post('/admins', adminController.store);

// GET localhost:8080/api/v1/admins/1234 - get an admin
router.get('/admins/:id', adminController.show);

// PUT localhost:8080/api/v1/admins/1234 - Update an admin
router.put('/admins/:id', adminController.update);

// DELETE localhost:8080/api/v1/admins/1234 - delete an admin
router.delete('/admins/:id', adminController.destroy);

module.exports = router;