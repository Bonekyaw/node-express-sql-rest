const express = require('express');

const router = express.Router();
const authController = require('../../controllers/authController');
const validatePhone = require('../../middlewares/check');

/* 
 * POST localhost:8080/api/v1/register 
 * Register an admin using Phone & password only
 * In real world, OTP should be used to verify phone number 
 * But in this app, we will simulate fake OTP - 123456 
*/

router.post('/register', validatePhone, authController.register);

router.post('/verify-otp', authController.verifyOTP);
router.post('/confirm-password', authController.confirmPassword);
router.post('/login', validatePhone, authController.login);

module.exports = router;