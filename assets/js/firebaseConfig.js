const firebaseConfig = {
  apiKey: "AIzaSyAjJGz7Bicg1MrDc81LIRqDCTz5sMIuj50",
  authDomain: "ldantas-learn-firebase.firebaseapp.com",
  databaseURL: "https://ldantas-learn-firebase.firebaseio.com",
  projectId: "ldantas-learn-firebase",
  storageBucket: "ldantas-learn-firebase.appspot.com",
  messagingSenderId: "912550901440",
  appId: "1:912550901440:web:f0a9e90ec0575ade34df25"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const 
  db = firebase.firestore(),
  timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, timestamp };

