import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";


import { useState} from "react";
import { signInAuthUserWithEmailAndPassword,signInWithGooglePopup,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import './sign-in.styles.scss'

function SignInForm (){
    const defualtFormFields = {
        email:'',
        password:'',

        
    }

    const [formFields,setFormFields] = useState(defualtFormFields);
    const {email,password} = formFields;




    async function signIWithGoogle() {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
 
    };

    async function handelSubmit(event) {
        event.preventDefault()
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password)
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
    


    
    function handelChange(event) {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }

    function resetFields(){
        setFormFields(defualtFormFields)
    }


    
    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form>
                <FormInput label="Email" type="email" required onChange={handelChange} name='email' value={email}/>
                <FormInput required label="Password" type='password' onChange={handelChange} name='password' value={password}/>

            </form>
            <div className="buttons-container">
                <Button type="submit" onClick={handelSubmit}>Sign In</Button>
                <Button buttonType='google' type= "button" onClick={signIWithGoogle}>Google Sign In</Button>
            </div>
        </div>
    )
}

export default SignInForm