const express = require('express');
const { AuthController } = require('@controllers');

const router = express.Router();

module.exports = router;

router
    .route('/login')
    .post(async (req, res, next) => {

    });
