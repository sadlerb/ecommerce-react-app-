import { useState } from "react";
import {useDispatch} from "react-redux"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {signUpStart} from '../../store/user/user.action'

import './sign-up-from.styles.scss'

const defualtFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}



function SignUpForm() {
    const [formFields,setFormFields] = useState(defualtFormFields);
    const {displayName,email,password,confirmPassword} = formFields;
    const dispatch = useDispatch()


    function handelChange(event){
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})
    }

    function resetFields(){
        setFormFields(defualtFormFields)
    }

    
    async function handleSubmit(event){
        event.preventDefault()
        if (password !== confirmPassword){
            alert("passwords do not match");
            return;
        };


        try{
           dispatch(signUpStart(email,password,displayName))       
           resetFields()

        }catch(error){
            console.log(error)
            if (error.code === 'auth/email-already-in-use'){
                alert("email already in use")
            }
            console.log("error" ,error)
        }

    }
    return (
        <div className="sign-up-container">
            <h2>Don't have and account?</h2>
            <span>Sign up email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handelChange} name='displayName' value={displayName}/>
                

                <FormInput required label="Email" type='email' onChange={handelChange} name='email' value={email}/>


                <FormInput required label="Password" type="password" onChange={handelChange} name='password' value={password}/>


                <FormInput required label="Confirm Password" type="password" onChange={handelChange} name='confirmPassword' value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>

            </form>
        </div>
    );


}
export default SignUpForm