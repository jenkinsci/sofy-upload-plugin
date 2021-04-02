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
            const userCreationOnBrainTree = await new Promise((resolve, reject) => {
                gateway.customer.create({
                    id: userDataFromUsers.recordset[0].UserGUID,
                    firstName: userDataFromUsers.recordset[0].FirstName,
                    company: userDataFromUsers.recordset[0].CompanyId,
                    email: userDataFromUsers.recordset[0].Email,
                }).then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
            });
            let resultFromBrainTreeUserCreationMethod = await userCreationOnBrainTree;
            if(resultFromBrainTreeUserCreationMethod.success)
            {
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
            else{
                return {"Error Message":"Cannot create user on BrainTree"}
            }
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

const CancelSubscription = async (userGuid) =>
{
    try {
        const currentSubscriptionID = await poolPromise.request()
        .input('userGuid', userGuid)
        .query('select subscriptionBTID from subscriptionsBTpayments where BTCustomerID = @userGuid and SubscriptionBTStatus = \'ACTIVE\'');
        if(currentSubscriptionID.lenght != 0)
        {
            const subscriptionCancelStatus = await new Promise((resolve, reject) => {
                gateway.subscription.cancel(currentSubscriptionID.recordset[0].SubscriptionBTID).then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
            });
            if(subscriptionCancelStatus.success)
            {
                await poolPromise.request()
                .input('subscriptionID', currentSubscriptionID.recordset[0].SubscriptionBTID)
                .query('update subscriptionsBTpayments set SubscriptionBTStatus = \'CANCELLED\' where SubscriptionBTID = @subscriptionID')
                return {"Message" : "Subscription Successfully Cancelled", "StatusCode":"200"}
            }
            else{
                return {"Message" : subscriptionCancelStatus.message, "StatusCode":"406"}
            }
        }
        else
        {
            return {"Message" : "No active subscriptions of this user", "StatusCode":"404"}
        }
    } catch (error) {
        console.log(error);
        return { "Message" : error, "StatusCode":"404" };
    }
}

module.exports = {
    BTTokenGeneration,
    CancelSubscription
};
