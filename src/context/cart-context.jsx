import { useReducer } from "react";
import { createContext } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems,productToAdd) =>{
    const existingCartItem = cartItems.find((cartItem) =>cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
          cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

    return [...cartItems,{...productToAdd,quantity:1}]
}

const removeCartItem = (cartItems,productToRemove)=>{
    const existingCartItem = cartItems.find((cartItem) =>cartItem.id === productToRemove.id);

    if (existingCartItem.quantity===1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    
}

const clearCartItem = (cartItems,itemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !==itemToClear.id)
    
}



export const CartContext = createContext({
    isCartOpen:false,
    setIsCartOpen:() => {},
    cartItems:[],
    addItemToCart: () =>{},
    removeItemFromCart: () =>{},
    clearItemFromCart: () =>{},
    cartcount:0,
    cartTotal:0
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN'

}

const cartReducer = (state,action)=>{
    const {type,payload} = action;


    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {...state,
            ...payload}
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }

        default:
            throw new Error("unhandled type of ${type} in cartReducer")
    }
}

const INITIAL_STATE = {
    cartcount:0,
    cartTotal:0,
    cartItems:[],
    isCartOpen:false
}

export const CartProvider = ({children}) => {

    const [{cartItems,isCartOpen,cartCount,cartTotal},dispatch] = useReducer(cartReducer,INITIAL_STATE)


    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total,cartItem) =>total + cartItem.quantity,0)
       

        const newCartTotal = newCartItems.reduce((total,cartItem) => total + cartItem.quantity * cartItem.price,0)


        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{cartItems:newCartItems,cartTotal:newCartTotal,cartCount:newCartCount})
           
    )}

   

    

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (cartItem) => {
        const newCartItems = removeCartItem(cartItems,cartItem)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItem) => {
        const newCartItems = clearCartItem(cartItems,cartItem)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) =>{
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool)
           
    )}

    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount,removeItemFromCart,clearItemFromCart,cartTotal}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}