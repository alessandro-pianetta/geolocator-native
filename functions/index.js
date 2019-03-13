// const firebase = require('firebase');
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const twilio = require("twilio");

// TODO: SAVE KEYS TO ENV WITH CLI: https://youtu.be/vIWXoaR_VnQ?t=5m54s
const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const twilioNumber = functions.config().twilio.phone;

const client = new twilio(accountSid, authToken);

/// Validate E164 format
function validE164(num) {
  return /^\+?[1-9]\d{1,14}$/.test(num);
}

exports.twilioSMS = functions.firestore
  .document("/users/{userId}/history/{messageTimestamp}")
  .onCreate((event, context) => {
    const { userId, messageTimestamp } = context.params;
    const ref = admin
      .firestore()
      .doc(`/users/${userId}/history/${messageTimestamp}`);
    return ref
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const { message, phoneNumber } = data;

          if (!validE164(phoneNumber)) {
            throw new Error("number must be E164 format!");
          }

          const textMessage = {
            body: message,
            to: phoneNumber, // Text to this number
            from: twilioNumber // From a valid Twilio number
          };

          return client.messages.create(textMessage);
        } else {
          throw new Error("No such document!");
        }
      })
      .then(message => console.log(message.sid, "success"))
      .catch(err => console.log(err));
  });
