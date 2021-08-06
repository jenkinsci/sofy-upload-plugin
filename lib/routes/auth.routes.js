const express = require('express');

const { AuthController } = require('@controllers');
const { UserModel, UserCode } = require('@models');

const Auth = new AuthController({ UserModel, UserCode });
const router = express.Router();

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Required fields missing' });
        return;
    }

    try {
        const data = await Auth.login(email, password);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    const {
        email, password, name, company, phone,
    } = req.body;

    try {
        const data = await Auth.register(
            email, password, name, company, phone,
        );
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.post('/verify-email', async (req, res, next) => {
    const { code } = req.body;
    if (!code) {
        res.status(400).json({ message: 'Required fields missing' });
        return;
    }

    try {
        await Auth.verifyEmail(code);
        res.json({ message: 'Your email has been verified successfully' });
    } catch (error) {
        next(error);
    }
});

router.post('/request-reset-password', async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: 'Required fields missing' });
        return;
    }

    try {
        await Auth.requestResetPassword(email);
        res.json({ message: 'A reset password code has been sent to your email address' });
    } catch (error) {
        next(error);
    }
});

router.post('/reset-password', async (req, res, next) => {
    const { code, newPassword } = req.body;
    if (!code) {
        res.status(400).json({ message: 'Required fields missing' });
        return;
    }

    try {
        await Auth.resetPassword(code, newPassword);
        res.json({ message: 'Your password has been updated successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
