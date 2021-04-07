const sql = require("mssql");
const { poolPromise } = require("../config/db")
const braintree = require("braintree");
const date = require ('date-and-time');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "6tnmjcg8y5xrkk5h",
    publicKey: "g5wc5w564jg2t2ss",
    privateKey: "a7237c4a19e98d43565a72e25d68c358"
});

const DateTimeNow = () =>
{
    var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();  
    return datetime;
}

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
            if (resultFromBrainTreeUserCreationMethod.success) {
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
            else {
                return { "Error Message": "Cannot create user on BrainTree" }
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

const CreateSubscription = async (paymentMethodNonce, planId, user_guid) => {
    try {
        const userDataFromBrainTreeTable = await poolPromise.request()
            .input('userGuid', user_guid)
            .query('select * from SubscriptionsBTPayments where BTCustomerID = @userGuid order by SubscriptionBTDetailsID desc');
        var currentdate = new Date();
        currentdate = date.format(currentdate, 'YYYY/MM/DD')
        if (userDataFromBrainTreeTable.recordset.length == 0) {
            const subscriptionCreationObject = await new Promise((resolve, reject) => {
                gateway.subscription.create({
                    paymentMethodNonce: paymentMethodNonce,
                    planId: planId
                }).then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                }); 
            });
            if(subscriptionCreationObject.success)
            {
                var billingPeriodEndDate = subscriptionCreationObject.subscription.billingPeriodEndDate;
                var subscriptionBTID = subscriptionCreationObject.subscription.id;
                var billingPeriodStartDate = subscriptionCreationObject.subscription.billingPeriodStartDate;
                var firstBillingDate = subscriptionCreationObject.subscription.firstBillingDate;
                var billingDayOfMonth = subscriptionCreationObject.subscription.billingDayOfMonth;
                var planBTreeCode = subscriptionCreationObject.subscription.planId;
                var userEmail = subscriptionCreationObject.subscription.transactions[0].customer.email;
                let spCreateSubscriptionResult = await poolPromise.request()
                    .input('emailID', sql.VarChar(50), userEmail)
                    .input('SubscriptionBTID', sql.VarChar(50), subscriptionBTID)
                    .input('SubscriptionBTStatus', sql.VarChar(10), 'ACTIVE')
                    .input('SubscriptionBTPlanID', sql.VarChar(50), planBTreeCode)
                    .input('SubscriptionBTCreatedDatetime', sql.DateTime, currentdate)
                    .input('BillingDayofmonth', sql.BigInt, billingDayOfMonth)
                    .input('BillingPeriodEndDate', sql.DateTime, billingPeriodEndDate)
                    .input('BillingPeriodStartDate', sql.DateTime, billingPeriodStartDate)
                    .input('FirstBillingDate', sql.DateTime, firstBillingDate)
                    .input('Numberofbillingcycles', sql.Int, 1)
                    .input('PaidThroughDate', sql.DateTime, billingPeriodEndDate)
                    .output('ErrorCode', sql.int)
                    .output('ErrorMessage', sql.VarChar(50))
                    .execute('spCreateSubscriptionsBTPaymentsV3');
                if(spCreateSubscriptionResult.output.ErrorCode == '0')
                {
                    return { "Message": {
                        "message" : "Subscription Successful!",
                        "status" : true,
                        "planID" :  planBTreeCode,
                        "nextBillingDate" : subscriptionCreationObject.subscription.nextBillingDate
                    }, "StatusCode": "200" }
                }
                else
                {
                    return { "Message": {
                        "message" : "Subscription Successful But Error in Information Saving!",
                        "status" : false
                    }, "StatusCode": "200" }
                }
            }
            else{
                return { "Message": {
                    "message" : subscriptionCreationObject.Message,
                    "status" : false
                }, "StatusCode": "200" }
            }
        }
        else{
            var paidThroughDateFromBTData = date.format(userDataFromBrainTreeTable.recordset[0].PaidThroughDate, 'YYYY/MM/DD')
            var userSubscriptionsID = userDataFromBrainTreeTable.recordset[0].SubscriptionBTID;
            const subscriptionCancelStatus = await new Promise((resolve, reject) => {
                gateway.subscription.cancel(userSubscriptionsID).then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
            });
            if(subscriptionCancelStatus.errors == null || subscriptionCancelStatus.message == 'Subscription has already been canceled.' )
            {
                if(userDataFromBrainTreeTable.recordset[0].SubscriptionBTPlanID == planId)
                {
                    return { "Message": {
                        "message" : 'User has already been subscribed to this plan!',
                        "status" : false
                    }, "StatusCode": "200" }
                }
                else{
                    const twoPlans = await poolPromise.request()
                    .input('planOne', planId)
                    .input('planTwo', userDataFromBrainTreeTable.recordset[0].SubscriptionBTPlanID)
                    .query('select * from plansv2 where BTreeCode in (@planOne, @planTwo) order by PlanID asc');
                    if (twoPlans.recordset[1].BTreeCode == planId || (paidThroughDateFromBTData < currentdate))
                    {
                        const subscriptionCreationObject = await new Promise((resolve, reject) => {
                            gateway.subscription.create({
                                paymentMethodNonce: paymentMethodNonce,
                                planId: planId
                            }).then(response => {
                                resolve(response);
                            }).catch(err => {
                                console.log(err);
                                reject(err);
                            }); 
                        });
                        if(subscriptionCreationObject.success)
                        {
                            var billingPeriodEndDate = subscriptionCreationObject.subscription.billingPeriodEndDate;
                            var subscriptionBTID = subscriptionCreationObject.subscription.id;
                            var billingPeriodStartDate = subscriptionCreationObject.subscription.billingPeriodStartDate;
                            var firstBillingDate = subscriptionCreationObject.subscription.firstBillingDate;
                            var billingDayOfMonth = subscriptionCreationObject.subscription.billingDayOfMonth;
                            var planBTreeCode = subscriptionCreationObject.subscription.planId;
                            var userEmail = subscriptionCreationObject.subscription.transactions[0].customer.email;
                            var currentdate = new Date();
                            currentdate = date.format(currentdate, 'YYYY/MM/DD HH:mm:ss')
                            let spCreateSubscriptionResult = await poolPromise.request()
                            .input('emailID', sql.VarChar(50), userEmail)
                            .input('SubscriptionBTID', sql.VarChar(50), subscriptionBTID)
                            .input('SubscriptionBTStatus', sql.VarChar(10), 'ACTIVE')
                            .input('SubscriptionBTPlanID', sql.VarChar(50), planBTreeCode)
                            .input('SubscriptionBTCreatedDatetime', sql.DateTime, currentdate)
                            .input('BillingDayofmonth', sql.BigInt, billingDayOfMonth)
                            .input('BillingPeriodEndDate', sql.DateTime, billingPeriodEndDate)
                            .input('BillingPeriodStartDate', sql.DateTime, billingPeriodStartDate)
                            .input('FirstBillingDate', sql.DateTime, firstBillingDate)
                            .input('Numberofbillingcycles', sql.Int, 1)
                            .input('PaidThroughDate', sql.DateTime, billingPeriodEndDate)
                            .output('ErrorCode', sql.int)
                            .output('ErrorMessage', sql.VarChar(50))
                            .execute('spCreateSubscriptionsBTPaymentsV3');
                            if(spCreateSubscriptionResult.output.ErrorCode == '0')
                            {
                                return { "Message": {
                                    "message" : "Subscription Successful!",
                                    "status" : true,
                                    "planID" :  planBTreeCode,
                                    "nextBillingDate" : subscriptionCreationObject.nextBillingDate
                                }, "StatusCode": "200" }
                            }
                            else
                            {
                                return { "Message": {
                                    "message" : "Subscription Successful But Error in Information Saving!",
                                    "status" : false
                                }, "StatusCode": "502" }
                            }
                        }
                        else
                        {
                            return { "Message": {
                                "message" : subscriptionCreationObject.message,
                                "status" : false
                            }, "StatusCode": "502" }
                        }
                    }
                    else{
                        paidThroughDateFromBTData = date.parse(paidThroughDateFromBTData, 'YYYY/MM/DD');
                        currentdate = date.parse(currentdate, 'YYYY/MM/DD');
                        var dayDiff = date.subtract(paidThroughDateFromBTData, currentdate).toDays();
                        var futureDate = date.addDays(currentdate, dayDiff);
                        const subscriptionCreationObject = await new Promise((resolve, reject) => {
                            gateway.subscription.create({
                                paymentMethodNonce: paymentMethodNonce,
                                planId: planId,
                                firstBillingDate: futureDate
                            }).then(response => {
                                resolve(response);
                            }).catch(err => {
                                console.log(err);
                                reject(err);
                            }); 
                        });
                        if(subscriptionCreationObject.success)
                        {
                            return { "Message": {
                                "message" : "Subscription Successful! This will be activated on next billing date",
                                "status" : true,
                                "planID" :  planId,
                                "nextBillingDate" : date.addDays(paidThroughDateFromBTData, 1)
                            }, "StatusCode": "200" }
                        }
                        else{
                            return { "Message": {
                                "message" : subscriptionCreationObject.message,
                                "status" : false
                            }, "StatusCode": "502" }
                        }
                    }
                }
            }
            else
            {
                return { "Message": {
                    "message" : subscriptionCancelStatus,
                    "status" : false
                }, "StatusCode": "502" }
            }
        }
    } catch (error) {
        console.log(error);
        return { "Message": error, "StatusCode": "500" };
    }
}

const CancelSubscription = async (userGuid) => {
    try {
        const currentSubscriptionID = await poolPromise.request()
            .input('userGuid', userGuid)
            .query('select subscriptionBTID from subscriptionsBTpayments where BTCustomerID = @userGuid and SubscriptionBTStatus = \'ACTIVE\'');
        if (currentSubscriptionID.lenght != 0) {
            var subscriptionIDFromDB = currentSubscriptionID.recordset[0].subscriptionBTID;
            const subscriptionCancelStatus = await new Promise((resolve, reject) => {
                gateway.subscription.cancel(subscriptionIDFromDB).then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
            });
            if (subscriptionCancelStatus.success) {
                return { "Message": "Subscription Successfully Cancelled", "StatusCode": "200" }
            }
            else {
                return { "Message": subscriptionCancelStatus.message, "StatusCode": "406" }
            }
        }
        else {
            return { "Message": "No active subscriptions of this user", "StatusCode": "404" }
        }
    } catch (error) {
        console.log(error);
        return { "Message": error, "StatusCode": "404" };
    }
}

const BrainTreeWebHookHandler = async (bt_signature, bt_payload) => {
    try {
        var webhookNotification = await new Promise((resolve, reject) => {
            gateway.webhookNotification.parse(
                bt_signature,
                bt_payload,
            ).then(response => {
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
        var subscriptionBTID = webhookNotification.subscription.id;
        var notificationType = webhookNotification.kind;
        if (notificationType == "subscription_charged_successfully") {
            var billingPeriodEndDate = webhookNotification.subscription.billingPeriodEndDate;
            var billingPeriodStartDate = webhookNotification.subscription.billingPeriodStartDate;
            var firstBillingDate = webhookNotification.subscription.firstBillingDate;
            var billingDayOfMonth = webhookNotification.subscription.billingDayOfMonth;
            var planBTreeCode = webhookNotification.subscription.planId;
            var userEmail = webhookNotification.subscription.transactions[0].customer.email;
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            let spCreateSubscriptionResult = await poolPromise.request()
            .input('emailID', sql.VarChar(50), userEmail)
            .input('SubscriptionBTID', sql.VarChar(50), subscriptionBTID)
            .input('SubscriptionBTStatus', sql.VarChar(10), 'ACTIVE')
            .input('SubscriptionBTPlanID', sql.VarChar(50), planBTreeCode)
            .input('SubscriptionBTCreatedDatetime', sql.DateTime, datetime)
            .input('BillingDayofmonth', sql.BigInt, billingDayOfMonth)
            .input('BillingPeriodEndDate', sql.DateTime, billingPeriodEndDate)
            .input('BillingPeriodStartDate', sql.DateTime, billingPeriodStartDate)
            .input('FirstBillingDate', sql.DateTime, firstBillingDate)
            .input('Numberofbillingcycles', sql.Int, 1)
            .input('PaidThroughDate', sql.DateTime, billingPeriodEndDate)
            .output('ErrorCode', sql.int)
            .output('ErrorMessage', sql.VarChar(50))
            .execute('spCreateSubscriptionsBTPaymentsV3')
            if(spCreateSubscriptionResult.output.ErrorCode == '0')
            {
                return { "Message": "Subscription Created in DB", "StatusCode": "200" };
            }
            else{
                return { "Message": "Subscription Not Created in DB", "StatusCode": "500" };
            }
        }
        else if (notificationType == "subscription_canceled") {
            const cancelSubscriptionInDB = await poolPromise.request()
                .input('subscriptionID', subscriptionBTID)
                .query('update subscriptionsBTpayments set SubscriptionBTStatus = \'CANCELLED\' where subscriptionBTID = @subscriptionID and SubscriptionBTStatus = \'ACTIVE\'');
                console.log(cancelSubscriptionInDB);
                if(cancelSubscriptionInDB.rowsAffected.length == 1)
                {
                    return { "Message": "Status updated", "StatusCode": "200" };
                }
                else{
                    return { "Message": "Status not updated", "StatusCode": "500" };
                }
        }
    } catch (error) {
        console.log(error);
        return { "Message": error, "StatusCode": "500" };
    }
}

module.exports = {
    BTTokenGeneration,
    CreateSubscription,
    CancelSubscription,
    BrainTreeWebHookHandler
};
