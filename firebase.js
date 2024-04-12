const admin = require ('firebase-admin') ;

admin.initializeApp({
    credential: admin.credential.cert('./serviceAccountKey.json'),
    databaseURL: "https://appnodejs-8f9ba-default-rtdb.firebaseio.com/"
});

module.exports = admin;