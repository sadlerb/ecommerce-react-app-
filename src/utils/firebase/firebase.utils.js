import {initializeApp} from 'firebase/app';
import {getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider} from 'firebase/auth'
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


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth,provider)


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db,'users',userAuth.user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const{displayName,email} = userAuth.user;

        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{displayName,email,createdAt})
        }catch (error){
            console.log("error creating the user" , error.message)
        }
    }

    return userDocRef;
}