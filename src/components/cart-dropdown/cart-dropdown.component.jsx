import {CartDropdownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles.jsx'

import { useNavigate } from 'react-router-dom'

import { useContext } from 'react'
import { CartContext } from '../../context/cart-context'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

function CartDropdown(){
    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    function goToCheckoutHandeler(){
        navigate('/checkout')


    }

 return(
    <CartDropdownContainer>
        <CartItems>
            {cartItems.length?(cartItems.map((item) =>(
                <CartItem cartItem={item} key={item.id}/>
            ))):<EmptyMessage>Your cart is empty</EmptyMessage> }
            <Button onClick={goToCheckoutHandeler}>
                Go To Checkout
            </Button>
        </CartItems>
    </CartDropdownContainer>
 )   
}

export default CartDropdown