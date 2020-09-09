const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.newUserSignup = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("Users").doc(user.uid).set({
    userID: user.uid,
    positiveRatings: [],
    negativeRatings: [],
  });
});

// //upvote callble function
// exports.upvote = functions.https.onCall((data, context) => {
//   //check is user is authenticated
//   if (!context.auth) {
//     throw new functions.https.HttpsError(
//       "unauthenticated",
//       "Only authenticated users can upvote"
//     );
//   }
//   //get refs for user doc and article doc
//   const user = admin.firestore.collection("Users").doc(context.auth.uid);
//   const article = admin.firestore.collection("Articles").doc(data.id);

//   return user.get().then((doc) => {
//     //check if user hasnt upvoted
//     if (doc.data().upvotedOn.includes(data.id)) {
//       throw new functions.https.HttpsError(
//         "failed-precondition",
//         "Only upvote something once"
//       );
//     }

//     //update user array
//     return user.update({
//       upvotedOn: [...doc.data().upvotedOn, data.id],
//     }).then(() =>{
//         //update votes
//         return article.update({
//             upvotes:  admin.firestore.FieldValue.increment(1)
//         })
//     });
//   });
// });
