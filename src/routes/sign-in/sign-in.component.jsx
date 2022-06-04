import { signInWithGooglePopup, createUserDocumentFromAuth,signInWithGoogleRedirect,auth} from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import formInput from "../../components/form-input/form-input.component";


function SignIn (){
    useEffect(() =>{
        async function fetchData(){
            const response = await getRedirectResult(auth)
            if (response){
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
    
        
    }
    fetchData()
    },[])
    async function logGoogleUser() {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
 
    };


    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign in with google popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;