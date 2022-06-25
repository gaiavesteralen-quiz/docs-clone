import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'
import { getFirestore, query, getDocs, collection, where, addDoc, serverTimestamp} from 'firebase/firestore'
import { enableIndexedDbPersistence } from "firebase/firestore"; 

export const firebaseConfig = {
    apiKey: "AIzaSyAG5OEusyCmSEUXr2d-wAhzmWcM2v7Im5E",
    authDomain: "new-docs-f375c.firebaseapp.com",
    projectId: "new-docs-f375c",
    storageBucket: "new-docs-f375c.appspot.com",
    messagingSenderId: "9428057264",
    appId: "1:9428057264:web:8c0fc54ce254dd574a0f75"
};  
//initalize firebase app
export const app = initializeApp(firebaseConfig);
//gets user authentication for firebase app
const auth = getAuth(app);
//gets the firestore database from firebase
const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });

//sign in with google
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        const docs = await getDocs(q);
        if (docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            })
        }
    } catch (err) {
        console.error(err)
        alert(err)
    }
}
//login with email and password
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        alert(err.message)
        console.error(err);
    }
}
//register with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const { photoURL } = auth.currentUser;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            photoURL
        })
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}
//send password reset
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert('Password reset link sent!')
    } catch (err) {
        console.error(err);
    }
}
//logout
const logout = () => {
    signOut(auth);
}
//add document data
const addDocs = async (title, photo, publicDoc, privateDoc, email) => {
    try {
        await addDoc(collection(db, "docs"), {
            title: title,
            created: serverTimestamp(),
            photoURL: photo,
            public: publicDoc,
            private: privateDoc,
            from: email 
        })
    } catch (error) {
        console.error(error)
    }
}

export {
    auth, db, signInWithEmailAndPassword, logInWithEmailAndPassword, registerWithEmailAndPassword, signInWithGoogle, sendPasswordReset, logout, addDocs
}