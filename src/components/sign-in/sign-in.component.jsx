import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useDispatch } from 'react-redux';

import { googleSignInStart } from "../../store/user/user.action";

import { useState} from "react";
import './sign-in.styles.scss'

function SignInForm (){
    const dispatch = useDispatch()
    const googleSignInUser = () => dispatch(googleSignInStart());
    const defualtFormFields = {
        email:'',
        password:'',

        
    }

    const [formFields,setFormFields] = useState(defualtFormFields);
    const {email,password} = formFields;




    async function signIWithGoogle() {
        dispatch(googleSignInUser())
 
    };

    async function handelSubmit(event) {
        event.preventDefault()
        try{
            dispatch();
            resetFields(email,password);
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
                <Button buttonType={BUTTON_TYPE_CLASSES.google} type= "button" onClick={signIWithGoogle}>Google Sign In</Button>
            </div>
        </div>
    )
}

export default SignInForm