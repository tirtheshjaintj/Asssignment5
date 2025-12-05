const express = require('express');
const { check } = require('express-validator');
const { restrictLogIn } = require('../middlewares/authCheck');
const {
    signup,
    login,
    google_login,
    updateUser,
    verifyOtp,
    resendOtp,
    getUser
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/getUser', restrictLogIn, getUser);



router.post('/signup',
    [
        check('name').matches(/^[a-zA-Z\s]+$/).isLength({ min: 3 }).withMessage('Name must contain only letters and spaces.'),
        check('email').isEmail().withMessage('Please enter a valid email address.'),
        check('phone_number').matches(/^[0-9]{10}$/).withMessage('Phone number must contain exactly 10 digits.'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    ],
    signup
);

router.post('/login',
    [
        check('email').isEmail().withMessage('Please enter a valid email address.'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    ],
    login
);

router.post('/google_login', [
    check('name').matches(/^[a-zA-Z\s]+$/).isLength({ min: 3 }).withMessage('Name must contain only letters and spaces.'),
    check('email').isEmail().withMessage('Please enter a valid email address.'),
    check('google_id').isLength({ min: 21, max: 21 }).matches(/^\d{21}$/).withMessage('Not a valid google_id')
], google_login);

router.put('/update',
    restrictLogIn,
    [
        check('name').optional().matches(/^[a-zA-Z\s]+$/).withMessage('Name must contain only letters and spaces.'),
        check('email').optional().isEmail().withMessage('Please enter a valid email address.'),
        check('phone_number').optional().matches(/^[0-9]{10}$/).withMessage('Phone number must contain exactly 10 digits.'),
    ],
    updateUser
);

router.post('/verify-otp/:userid',
    [
        check('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits.'),
        check('userid').isMongoId().withMessage('Invalid User ID.')
    ],
    verifyOtp
);

router.post('/resend-otp/:userid',
    check('userid').isMongoId().withMessage('Invalid User ID.')
    ,
    resendOtp
);






module.exports = router;
