var firebaseConfig = {
  apiKey: "AIzaSyA-1vzMmTDNS0CMluqSqZEwiUmMlQecF08",
  authDomain: "sample-food-pwa.firebaseapp.com",
  databaseURL: "https://sample-food-pwa.firebaseio.com",
  projectId: "sample-food-pwa",
  storageBucket: "sample-food-pwa.appspot.com",
  messagingSenderId: "160229664245",
  appId: "1:160229664245:web:b5a4a30fc1234f1e9dacbc",
  measurementId: "G-RNPTTQJQSM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
