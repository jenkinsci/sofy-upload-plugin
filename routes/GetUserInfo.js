const express = require("express");
let app = express.Router();
const { poolPromise } = require("../config/db-connect");


app.get('/:userID', async (req, res) => {
    try {
        const request = await poolPromise.request()
            .input('userID', req.params.userID)
            .query('select * from Users where UserID = @userID');
        res.json(request.recordset)

    } catch (err) {
        res.status(500)
        res.json(err.message)
    }
})

module.exports = app;