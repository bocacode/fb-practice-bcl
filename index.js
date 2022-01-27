// import our restaurants
const restaurants = require('./restaurants.json');

// import a set of tools to talk to firebase and Firestore
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// import our credentials
const credentials = require('./credentials.json');

// connect to firebase services
initializeApp({
  credential: cert(credentials)
});

// connect to Firestore
const db = getFirestore();

// create a collection called "restaurants"
console.log(' -- We are about to do some stuff -- ');

// add each restaurant
db.collection('restaurants').add(restaurants[3])
  .then(doc => {
    console.log('Added restaurant', doc.id);
    // the new restaurant has been
    db.collection('restaurants').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
      })
    })
    .then(() => {
      console.log('All 4 restaurants returned.');
    });
  })
  .catch(err => {
    console.error(err);
  });

console.log(' -- This has nothing to do with restaurants -- ');
// read one document
// db.collection('restaurants').doc('hVJrR04ObLv6TyWAPMVp').get()
//   .then(doc => {
//     console.log(doc.id, ' => ', doc.data());
//   })
//   .catch(err => console.error(err));

// get all documents
// db.collection('restaurants').get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       console.log(doc.id, ' => ', doc.data());
//     })
//   })
//   .catch(console.error);

// find a document(s)
