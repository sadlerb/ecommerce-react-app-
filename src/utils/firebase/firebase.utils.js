import { async } from '@firebase/util';
import {initializeApp} from 'firebase/app';
import {getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfe68XxXXKRmA5zEhEgFgPzykrXcDWhYI",
    authDomain: "ecommerce-db-ae71b.firebaseapp.com",
    projectId: "ecommerce-db-ae71b",
    storageBucket: "ecommerce-db-ae71b.appspot.com",
    messagingSenderId: "1089343280485",
    appId: "1:1089343280485:web:08506c202aee25aef63d8c"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,GoogleProvider)
export const db = getFirestore();
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,GoogleProvider)




export async function createUserDocumentFromAuth(userAuth,additionalInformation={}) {
    console.log(userAuth)
    const userDocRef = doc(db,'users',userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const{displayName,email} = userAuth;

        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName,email,createdAt,...additionalInformation})
        }catch (error){

            console.log("error creating the user" , error.message)
        }
    }

    return userDocRef;
}


export async function createAuthUserWithEmailAndPassword(email,password){
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
}

export async function signInAuthUserWithEmailAndPassword(email,password){
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password)
}


export async function signOutUser(){
    await signOut(auth)
}

export function onAuthStateChangedListener(callback){
    onAuthStateChanged(auth,callback)
}