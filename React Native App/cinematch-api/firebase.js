import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5cE71hIyAzSLc2jduyA6fxqg1ICLEvUo",
  authDomain: "cinematch-97725.firebaseapp.com",
  projectId: "cinematch-97725",
  storageBucket: "cinematch-97725.appspot.com",
  messagingSenderId: "710353970185",
  appId: "1:710353970185:web:94080f0e3a9ddf68d2c4d8"
};


// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };

