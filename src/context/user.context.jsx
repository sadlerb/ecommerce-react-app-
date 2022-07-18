import { type } from "@testing-library/user-event/dist/type";
import { createContext, useState, useEffect,useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";



// actual value we want to access
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:() => null,
});

export const USER_ACTION_TYPES ={
    "SET_CURRENT_USER":"SET_CURRENT_USER"
}

const userReduser = (state,action) =>{
    const {type,payload} = action


   switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
        return{
            ...state,
            currentUser:payload
        }
    
    default:
        throw new Error('Unhandeled Type ${type} in userReducer');
   }
}

const INITIAL_STATE = {
    currentUser:null
}

export const UserProvider = ({children}) =>{
    //const [currentUser,setCurrentUser] = useState(null)
    const [state,dispach] = useReducer(userReduser,INITIAL_STATE)
    const {currentUser} = state
    const setCurrentUser = (user)=>{
        dispach({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user})
    }
    const value = {currentUser,setCurrentUser}

    useEffect(() =>{
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user){
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)

        })

        return unsubscribe
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


