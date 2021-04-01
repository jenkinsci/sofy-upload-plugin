const sql = require("mssql");
const {poolPromise} = require("../config/db")
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "6tnmjcg8y5xrkk5h",
    publicKey: "g5wc5w564jg2t2ss",
    privateKey: "a7237c4a19e98d43565a72e25d68c358"
});

const BTTokenGeneration = async (userID) => {
    console.log(userID);
    let stringGuid = String(userID);
    const userDataFromUserBrainTreeDetails = await poolPromise.request()
        .input('userID', sql.BigInt, userID)
        .query('select * from Users where UserID = @userID');
    console.log(userDataFromUserBrainTreeDetails);
    var recordset = userDataFromUserBrainTreeDetails.recordset;
        return { recordset }
    if (!userDataFromUserBrainTreeDetails.length) {
        const {
            recordset: userDataFromUsers,
        } = await sql.query`Select * from Users where UserGUID = ${userGuid}`;
        if (userDataFromUsers.lenght) {
            gateway.customer.create({
                Id: userDataFromUsers[0].UserGUID,
                FirstName: userDataFromUsers[0].FirstName,
                company: userDataFromUsers[0].CompanyId,
                email: userDataFromUsers[0].Email,
            }, (err, result) => {
                if (result.success) {
                    gateway.clientToken.generate({
                        customerId: userGuid
                    }, (err, response) => {
                        const clientToken = response.clientToken
                        return { clientToken };
                    });
                }
            });
        }
        else {
            return { "ErrorMessage": "No user regitsered against given guid" };
        }
    }
    else if (userDataFromUserBrainTreeDetails.length) {
        gateway.clientToken.generate({
            customerId: userGuid
        }, (err, response) => {
            const clientToken = response.clientToken
            return { clientToken };
        });
    }
};

module.exports = {
    BTTokenGeneration,
};
