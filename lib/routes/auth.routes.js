const express = require('express');

const { AuthController } = require('@controllers');
const { UserModel } = require('@models');

const Auth = new AuthController({ UserModel });
const router = express.Router();

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Required fields missing' });
    }

    try {
        const data = await Auth.login(email, password);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const data = await Auth.register(email, password);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
