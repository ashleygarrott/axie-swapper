import firebase from "firebase/app"
import "firebase/database";
import "firebase/auth"




 // Set the configuration for your app
  // TODO: Replace with your project's config object
//   var config = {
//     apiKey: "AIzaSyBfkESN1vHRjyV6FU8-zs0IqMIKtHBSAKI",
//     authDomain: "axie-swapper.firebaseapp.com",
//     // For databases not in the us-central1 location, databaseURL will be of the
//     // form https://[databaseName].[region].firebasedatabase.app.
//     // For example, https://your-database-123.europe-west1.firebasedatabase.app
//     databaseURL: "https://axie-swapper-default-rtdb.asia-southeast1.firebasedatabase.app/",
//     storageBucket: "axie-swapper.appspot.com"
//   };

const firebaseConfig = {
    apiKey: "AIzaSyDD-UFcl1kz_09IuCIzrrG59u56X-usCA4",
    authDomain: "axie-swapper.firebaseapp.com",
    databaseURL: "https://axie-swapper-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "axie-swapper",
    storageBucket: "axie-swapper.appspot.com",
    messagingSenderId: "84019398654",
    appId: "1:84019398654:web:71a835471bfe2f0cefa2af",
    measurementId: "G-YHJFNG9416"
  };

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  var database = firebase.database();

  export default {
      database: database
  }