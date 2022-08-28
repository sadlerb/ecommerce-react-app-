import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useDispatch } from 'react-redux';

import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

import { useState,FormEvent,ChangeEvent} from "react";
import { SignInContainer,ButtonsContainer } from "./sign-in.styles";

function SignInForm (){
    const dispatch = useDispatch()
    const googleSignInUser = () => dispatch(googleSignInStart());
    const defualtFormFields = {
        email:'',
        password:'',

        
    }

    const [formFields,setFormFields] = useState(defualtFormFields);
    const {email,password} = formFields;




    async function signInWithGoogle() {
        dispatch(googleSignInUser())
 
    };

    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try{
            dispatch(emailSignInStart(email,password));
            resetFields();
        }catch (error){
            switch(error){
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
    


    
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }

    function resetFields(){
        setFormFields(defualtFormFields)
    }


    
    return (
        <SignInContainer>
          <h2>Already have an account?</h2>
          <span>Sign in with your email and password</span>
          <form onSubmit={handleSubmit}>
            <FormInput
              label='Email'
              type='email'
              required
              onChange={handleChange}
              name='email'
              value={email}
            />
    
            <FormInput
              label='Password'
              type='password'
              required
              onChange={handleChange}
              name='password'
              value={password}
            />
            <ButtonsContainer>
              <Button type='submit'>Sign In</Button>
              <Button
                buttonType={BUTTON_TYPE_CLASSES.google}
                type='button'
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </Button>
            </ButtonsContainer>
          </form>
        </SignInContainer>
      );
    };
    

export default SignInForm