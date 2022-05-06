import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB4cKcO1n9yXZHKho0xrzw9oGHpmZ9pS4M",
  authDomain: "blue-ocean-89efd.firebaseapp.com",
  projectId: "blue-ocean-89efd",
  storageBucket: "blue-ocean-89efd.appspot.com",
  messagingSenderId: "280780835729",
  appId: "1:280780835729:web:17535b214af55cb506a830",
  measurementId: "G-CGT4Z78V8C"
};

const app = firebase.initializeApp(firebaseConfig);

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// })

export const auth = app.auth()
export default app
