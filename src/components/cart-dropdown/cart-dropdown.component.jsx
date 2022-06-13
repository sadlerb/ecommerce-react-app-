import './cart-dropdown.styles.scss'

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
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            {cartItems.map((item) =>(
                <CartItem cartItem={item} key={item.id}/>
            ))}
            <Button onClick={goToCheckoutHandeler}>
                Go To Checkout
            </Button>
        </div>
    </div>
 )   
}

export default CartDropdown