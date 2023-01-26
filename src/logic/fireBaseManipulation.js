import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInAnonymously
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc, 
  serverTimestamp,
  where
} from 'firebase/firestore';
import { 
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';

export function fbInit() {

    const firebaseConfig = {
        apiKey: "AIzaSyC3PRzhNZZr2HC54_2e1mBIgu1I71exY3o",
        authDomain: "doingit-app.firebaseapp.com",
        projectId: "doingit-app",
        storageBucket: "doingit-app.appspot.com",
        messagingSenderId: "69184799749",
        appId: "1:69184799749:web:da85a20b521e3b4d29c86c"
    };

    const app = initializeApp(firebaseConfig);

}

export async function signInGoogle() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

export function signOutUser() {
  signOut(getAuth());
}

export function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  function authStateObserver(user) {
    
    const autContainer = document.querySelector('.aut');

    if (user) { //If user logged in
        
        autContainer.classList.add("invisible");

    } else { //If user logged out
      
      autContainer.classList.remove("invisible");
    }
  } 

  export async function saveData(obj) {
    try {await setDoc(doc(getFirestore(), "data", getAuth().currentUser.uid), {
      id: getAuth().currentUser.uid,
      data: obj
    });}
    catch(error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

  export function loadData() {

    let loadData = new Promise(function(resolve) {
  
      const userData = query(collection(getFirestore(), 'data'), where("id", "==", `${getAuth().currentUser.uid}`));
      
       onSnapshot(userData, function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            var data = change.doc.data();
            resolve(JSON.parse(data.data));
          
        });
      });
  
        
      
    });

    return loadData;

  }

   

  /*
  export async function loadData() {
 
    const userData = query(collection(getFirestore(), 'data'), where("id", "==", `${getAuth().currentUser.uid}`));
    
     onSnapshot(userData, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          var data = change.doc.data();
          console.log(JSON.parse(data.data));
          return JSON.parse(data.data);
        
      });
    });
  }*/