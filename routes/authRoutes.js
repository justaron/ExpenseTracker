const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({
        message: 'Welcome to your profile',
        userId: req.user.id
    });
});

module.exports = router;
