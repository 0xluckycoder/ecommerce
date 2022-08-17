const { Router } = require('express');
const authController = require('../../controllers/authController');

const router = Router();

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);

router.get('/confirmEmail/:token', authController.confirmEmail);

router.get('/verifyAuth', authController.verifyAuth);

module.exports = router;