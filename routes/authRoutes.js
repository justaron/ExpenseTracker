const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {register} = require('../controllers/authController');
const {login} = require('../controllers/authController');
router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, (req, res)=> {
    res.status(200).json({message: 'Welcome to your profile', userId: req.user.userId});
});
module.exports = router;