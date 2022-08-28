import SignUpForm from "../../components/sign-up/sign-up-component";
import SignInForm from "../../components/sign-in/sign-in.component";

import { AuthenticationContainer } from "./authentication.styles";


function Authentication (){



    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication;