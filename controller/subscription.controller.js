const sql = require("mssql");
const { poolPromise } = require("../config/db")
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "6tnmjcg8y5xrkk5h",
    publicKey: "g5wc5w564jg2t2ss",
    privateKey: "a7237c4a19e98d43565a72e25d68c358"
});

const BTTokenGeneration = async (userGuid) => {
    console.log(userGuid);
    const userDataFromUserBrainTreeDetails = await poolPromise.request()
        .input('userGuid', userGuid)
        .query('select * from SubscriptionsBTPayments where BTCustomerID = @userGuid');
    console.log(userDataFromUserBrainTreeDetails.recordset.length);
    if (userDataFromUserBrainTreeDetails.recordset.length == 0) {
        const userDataFromUsers = await poolPromise.request()
            .input('userGuid', userGuid)
            .query('Select * from Users where UserGUID = @userGuid');
        if (userDataFromUsers.lenght != 0) {
            gateway.customer.create({
                Id: userDataFromUsers.recordset[0].UserGUID,
                FirstName: userDataFromUsers.recordset[0].FirstName,
                company: userDataFromUsers.recordset[0].CompanyId,
                email: userDataFromUsers.recordset[0].Email,
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
    else {
        const token = await new Promise((resolve, reject) => {
            gateway.clientToken.generate({
                customerId: userGuid
            }).then(response => {
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
        return token;
    }
};

module.exports = {
    BTTokenGeneration,
};
