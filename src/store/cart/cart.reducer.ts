import { CartItem, CART_ACTION_TYPES } from "./cart.type";

import { setIsCartOpen,setCartItems } from "./cart.action";

import { AnyAction } from "redux";

export type CartState = {
    isCartOpen: boolean;
    cartItems:CartItem[];
}


export const cartReducer = (state = CART_INITIAL_STATE,action:AnyAction):CartState=>{

    if (setIsCartOpen.match(action)){
        return{
            ...state,
            isCartOpen:action.payload
            }
    }

    if (setCartItems.match(action)){
        return{
            ...state,
            cartItems:action.payload
        }
    }

    return state

    // switch(type){
    //     case CART_ACTION_TYPES.SET_CART_ITEMS:
    //         return {...state,
    //         cartItems:payload}
    //     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    //         return{
    //             ...state,
    //             isCartOpen:payload
    //         }

    //     default:
    //         return state
    // }
}

const CART_INITIAL_STATE:CartState = {
    cartItems:[],
    isCartOpen:false
}