import { useState, useContext } from "react";

import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

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
            const {user} = await createAuthUserWithEmailAndPassword(email,password)
            const userDocRef = await createUserDocumentFromAuth(user,{'displayName':displayName});


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