const sql = require("mssql");
const { db } = require("../config/db")
const braintree = require("braintree");
const moment = require("moment");
const createError = require('http-errors');

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "6tnmjcg8y5xrkk5h",
    publicKey: "g5wc5w564jg2t2ss",
    privateKey: "a7237c4a19e98d43565a72e25d68c358"
});

//controller method to get user specific token, generated to initiate braintree drop in UI payment form.
const btTokenGeneration = async (userGuid) => {
    //checking user data in Braintree table (SubscriptionsBTPayments)
    const userDataFromUserBrainTreeDetails = await db.request()
        .input('userGuid', userGuid)
        .query('select * from SubscriptionsBTPayments where BTCustomerID = @userGuid');
    //if information is not in the table then user hasn't paid through Braintree in the past. So create the user first on Braintree
    if (userDataFromUserBrainTreeDetails.recordset.length == 0) {
        //fetching user details from DB
        const userDataFromUsers = await db.request()
            .input('userGuid', userGuid)
            .query('Select * from Users where UserGUID = @userGuid');
        //creating user on Braintree
        if (userDataFromUsers.recordset.length != 0) {
            const userCreationOnBrainTree = await gateway.customer.create({
                id: userDataFromUsers.recordset[0].UserGUID,
                firstName: userDataFromUsers.recordset[0].FirstName,
                company: userDataFromUsers.recordset[0].CompanyId,
                email: userDataFromUsers.recordset[0].Email,
            });
            let resultFromBrainTreeUserCreationMethod = await userCreationOnBrainTree;
            if (!resultFromBrainTreeUserCreationMethod.success) {
                throw createError(502, 'Cannot create user on BrainTree');
            }
        }
        else {
            throw createError(400, 'No user registered against given guid');
        }
    }
    //token generation on Braintree.
    const token = await gateway.clientToken.generate({
        customerId: userGuid
    });
    return token;
};

const createSubscription = async (paymentMethodNonce, planId, user_guid) => {
        //checking user data in Braintree table (SubscriptionsBTPayments)
        const userDataFromBrainTreeTable = await db.request()
            .input('userGuid', user_guid)
            .query('select top 1 * from SubscriptionsBTPayments where BTCustomerID = @userGuid order by SubscriptionBTDetailsID desc');
        let currentdate = moment();
        //if user hasn't paid in the past then create the subscription straigt away
        if (userDataFromBrainTreeTable.recordset.length == 0) {
            //subscription creation on braintree
            const subscriptionCreationObject = await gateway.subscription.create({
                paymentMethodNonce: paymentMethodNonce,
                planId: planId
            });
            if (subscriptionCreationObject.success) {
                //save Braintree returned information in db
                let { billingPeriodEndDate, id, billingPeriodStartDate, firstBillingDate, billingDayOfMonth, planId }
                    = subscriptionCreationObject.subscription;
                var userEmail = subscriptionCreationObject.subscription.transactions[0].customer.email;
                let spCreateSubscriptionResult = await db.request()
                    .input('emailID', sql.VarChar(50), userEmail)
                    .input('SubscriptionBTID', sql.VarChar(50), id)
                    .input('SubscriptionBTStatus', sql.VarChar(10), 'ACTIVE')
                    .input('SubscriptionBTPlanID', sql.VarChar(50), planId)
                    .input('SubscriptionBTCreatedDatetime', sql.DateTime, currentdate.format())
                    .input('BillingDayofmonth', sql.BigInt, billingDayOfMonth)
                    .input('BillingPeriodEndDate', sql.DateTime, billingPeriodEndDate)
                    .input('BillingPeriodStartDate', sql.DateTime, billingPeriodStartDate)
                    .input('FirstBillingDate', sql.DateTime, firstBillingDate)
                    .input('Numberofbillingcycles', sql.Int, 1)
                    .input('PaidThroughDate', sql.DateTime, billingPeriodEndDate)
                    .output('ErrorCode', sql.int)
                    .output('ErrorMessage', sql.VarChar(50))
                    .execute('spCreateSubscriptionsBTPaymentsV3');
                if (spCreateSubscriptionResult.output.ErrorCode != '0') {
                    throw createError(500, 'Subscription Successful But Error in Information Saving!');
                }
            }
            else {
                throw createError(500, subscriptionCreationObject.Message);
            }
        }
        else {
            //if user has been paid through Braintree in the past
            //check if user is trying to subscribe to the same plan which he has been already subscribed.
            if (userDataFromBrainTreeTable.recordset[0].SubscriptionBTPlanID == planId) {
                throw createError(400, 'User has already been subscribed to this plan!');
            }
            let paidThroughDateFromBTData = moment(userDataFromBrainTreeTable.recordset[0].PaidThroughDate);
            let userSubscriptionsID = userDataFromBrainTreeTable.recordset[0].SubscriptionBTID;
            //cancelling current subscription to create new
            const subscriptionCancelStatus = await gateway.subscription.cancel(userSubscriptionsID);
            if (subscriptionCancelStatus.errors == null || subscriptionCancelStatus.message == 'Subscription has already been canceled.') {
                //checking quality of plan in terms of features on which user wants to switch. Plans are sorted in db by their feature counts using
                // their primary keys
                const twoPlans = await db.request()
                    .input('planOne', planId)
                    .input('planTwo', userDataFromBrainTreeTable.recordset[0].SubscriptionBTPlanID)
                    .query('select * from plansv2 where BTreeCode in (@planOne, @planTwo) order by PlanID asc');
                //if the current plan is lower or subcription cycle end date has been passed or it is equal to the current date.
                if (twoPlans.recordset[1].BTreeCode == planId || ((paidThroughDateFromBTData.diff(currentdate, 'days')) < 1)) {
                    //creating the subscription
                    const subscriptionCreationObject = await gateway.subscription.create({
                        paymentMethodNonce: paymentMethodNonce,
                        planId: planId
                    });
                    if (subscriptionCreationObject.success) {
                        //saving information in DB
                        let { billingPeriodEndDate, id, billingPeriodStartDate, firstBillingDate, billingDayOfMonth, planId }
                        = subscriptionCreationObject.subscription;
                        let userEmail = subscriptionCreationObject.subscription.transactions[0].customer.email;
                        let spCreateSubscriptionResult = await db.request()
                            .input('emailID', sql.VarChar(50), userEmail)
                            .input('SubscriptionBTID', sql.VarChar(50), id)
                            .input('SubscriptionBTStatus', sql.VarChar(10), 'ACTIVE')
                            .input('SubscriptionBTPlanID', sql.VarChar(50), planId)
                            .input('SubscriptionBTCreatedDatetime', sql.DateTime, currentdate.format())
                            .input('BillingDayofmonth', sql.BigInt, billingDayOfMonth)
                            .input('BillingPeriodEndDate', sql.DateTime, billingPeriodEndDate)
                            .input('BillingPeriodStartDate', sql.DateTime, billingPeriodStartDate)
                            .input('FirstBillingDate', sql.DateTime, firstBillingDate)
                            .input('Numberofbillingcycles', sql.Int, 1)
                            .input('PaidThroughDate', sql.DateTime, billingPeriodEndDate)
                            .output('ErrorCode', sql.int)
                            .output('ErrorMessage', sql.VarChar(50))
                            .execute('spCreateSubscriptionsBTPaymentsV3');
                        if (spCreateSubscriptionResult.output.ErrorCode != '0') {
                            throw createError(500, 'Subscription Successful But Error in Information Saving!');
                        }
                    }
                    else {
                        throw createError(502, subscriptionCreationObject.Message);
                    }
                }
                else {  
                    //if current plan is higher
                    //setting future subscription activation date by calculating difference in days in current date and current subscription's end date               
                    let dayDiff = paidThroughDateFromBTData.diff(currentdate, 'days');        
                    let futureDate = currentdate.add(dayDiff + 2, 'days');
                    //creating subscription with future date. The subscription will be activated by 'firstBilingDate'
                    const subscriptionCreationObject = await gateway.subscription.create({
                        paymentMethodNonce: paymentMethodNonce,
                        planId: planId,
                        firstBillingDate: futureDate.format('YYYY-MM-DD')
                    });
                    if (!subscriptionCreationObject.success) {
                        throw createError(502, subscriptionCreationObject.message);
                    }
                }
            }
            else {
                throw createError(502, subscriptionCancelStatus);
            }
        }
}

//method for subscription cancellation on Braintree
const cancelSubscription = async (userGuid) => {
    //get subscription id from DB
    const currentSubscriptionID = await db.request()
        .input('userGuid', userGuid)
        .query('select subscriptionBTID from subscriptionsBTpayments where BTCustomerID = @userGuid and SubscriptionBTStatus = \'ACTIVE\'');
    if (currentSubscriptionID.lenght != 0) {
        var subscriptionIDFromDB = currentSubscriptionID.recordset[0].subscriptionBTID;
        //cancel subscription on Braintree
        const subscriptionCancelStatus = await gateway.subscription.cancel(subscriptionIDFromDB);
        if (!subscriptionCancelStatus.success && subscriptionCancelStatus.message != 'Subscription has already been canceled.') {
            createError(406, subscriptionCancelStatus.message);
        }
    }
    else {
        return { "Message": "No active subscriptions of this user", "StatusCode": "404" }
    }
}

//braintree webhook handler methods
//Braintree sends encryped data in bt_payload, bt_signature is the key used to decrypt it.
const brainTreeWebHookHandler = async (bt_signature, bt_payload) => {

    //parse the bt_payload (decryption)
    var webhookNotification = await gateway.webhookNotification.parse(
        bt_signature,
        bt_payload,
    );
    //getting notification type
    var subscriptionBTID = webhookNotification.subscription.id;
    var notificationType = webhookNotification.kind;
    if (notificationType == "subscription_charged_successfully") {
        //saving information in DB
        let { billingPeriodEndDate, id, billingPeriodStartDate, firstBillingDate, billingDayOfMonth, planId }
                = webhookNotification.subscription;
        let userEmail = webhookNotification.subscription.transactions[0].customer.email;
        let currentdate = moment().format();
        let spCreateSubscriptionResult = await db.request()
            .input('emailID', sql.VarChar(50), userEmail)
            .input('SubscriptionBTID', sql.VarChar(50), id)
            .input('SubscriptionBTStatus', sql.VarChar(10), 'ACTIVE')
            .input('SubscriptionBTPlanID', sql.VarChar(50), planId)
            .input('SubscriptionBTCreatedDatetime', sql.DateTime, currentdate)
            .input('BillingDayofmonth', sql.BigInt, billingDayOfMonth)
            .input('BillingPeriodEndDate', sql.DateTime, billingPeriodEndDate)
            .input('BillingPeriodStartDate', sql.DateTime, billingPeriodStartDate)
            .input('FirstBillingDate', sql.DateTime, firstBillingDate)
            .input('Numberofbillingcycles', sql.Int, 1)
            .input('PaidThroughDate', sql.DateTime, billingPeriodEndDate)
            .output('ErrorCode', sql.int)
            .output('ErrorMessage', sql.VarChar(50))
            .execute('spCreateSubscriptionsBTPaymentsV3')
        if (spCreateSubscriptionResult.output.ErrorCode == '0') {
            return { "Message": "Subscription Created in DB", "StatusCode": "200" };
        }
        else {
            return { "Message": "Subscription Not Created in DB", "StatusCode": "500" };
        }
    }
    else if (notificationType == "subscription_canceled") {
        //setting 'Cancelled' subsctiption status in DB 
        const cancelSubscriptionInDB = await db.request()
            .input('subscriptionID', subscriptionBTID)
            .query('update subscriptionsBTpayments set SubscriptionBTStatus = \'CANCELLED\' where subscriptionBTID = @subscriptionID and SubscriptionBTStatus = \'ACTIVE\'');
        console.log(cancelSubscriptionInDB);
        if (cancelSubscriptionInDB.rowsAffected.length == 1) {
            return { "Message": "Status updated", "StatusCode": "200" };
        }
        else {
            return { "Message": "Status not updated", "StatusCode": "500" };
        }
    }
}

module.exports = {
    btTokenGeneration,
    createSubscription,
    cancelSubscription,
    brainTreeWebHookHandler
};
