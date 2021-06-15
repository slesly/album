import firebase from 'firebase/app'
import 'firebase/firestore'

// App's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCr-NCDfB7Uad51ItZOOXkpvf_BeG5xf1Q",
    authDomain: "products-album.firebaseapp.com",
    projectId: "products-album",
    storageBucket: "products-album.appspot.com",
    messagingSenderId: "397251959838",
    appId: "1:397251959838:web:250a458d6fa7d44aaf220f"
  };
// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;