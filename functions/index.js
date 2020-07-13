/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: 'KEY HERE',
    apiSecret: 'SECRET HERE',
});

exports.Verify = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    if (request.body.number) {
        nexmo.verify.request({
            number: request.body.number,
            brand: request.body.appName
        }, (err, result) => {
            if (err) {
                response.send(err);
            } else {
                // const verifyRequestId = result.request_id;
                response.send(result);
                //console.log('request_id', verifyRequestId);

            }
        });
    } else if (request.body.reqID) {
        nexmo.verify.check({
            request_id: request.body.reqID,
            code: request.body.code
        }, (err, result) => {
            if (err) {
                response.send(err);
            } else {
                // const verifyRequestId = result.request_id;
                response.send(result);
                //console.log('request_id', verifyRequestId);
            }
        });

    }

});