import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFrVwcexn1Hg7vMrwssk5DXN36jE0r8MA",
  authDomain: "rn-project-96782.firebaseapp.com",
  projectId: "rn-project-96782",
  storageBucket: "rn-project-96782.appspot.com",
  messagingSenderId: "421894856448",
  appId: "1:421894856448:web:2f60253b472f340bf91de5",
  measurementId: "G-XN6NXW0N73",
};

export default firebase.initializeApp(firebaseConfig);
