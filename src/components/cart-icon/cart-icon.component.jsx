import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.styles.jsx'


import { useContext } from 'react'
import { CartContext } from '../../context/cart-context'

function CartIcon() {
    const {isCartOpen,setIsCartOpen,cartCount} = useContext(CartContext)

    function toggleIsCartOpen(){
        setIsCartOpen(!isCartOpen)
    }

    return(
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
    
)}

export default CartIcon