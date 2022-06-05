import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { useState } from "react";
import { signInAuthUserWithEmailAndPassword,signInWithGooglePopup,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import './sign-in.styles.scss'

function SignInForm (){
    const defualtFormFields = {
        email:'',
        password:'',
    }

    async function signIWithGoogle() {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
 
    };

    const [formFields,setFormFields] = useState(defualtFormFields);
    const {email,password} = formFields;
    console.log(formFields)
    
    function handelChange(event) {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }
    function resetFields(){
        setFormFields(defualtFormFields)
    }

    async function handelSubmit(event) {
        event.preventDefault()
        try{
            const response = await signInAuthUserWithEmailAndPassword(email,password)
            resetFields()
        }catch (error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert("incorrect Password");
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }

            
        }
    }
    
    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form>
                <FormInput label="Display Name" type="text" required onChange={handelChange} name='email' value={email}/>
                <FormInput required label="Email" type='email' onChange={handelChange} name='password' value={password}/>

            </form>
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button buttonType='google' type= "button" onClick={signIWithGoogle}>Google Sign In</Button>
            </div>
        </div>
    )
}

export default SignInForm