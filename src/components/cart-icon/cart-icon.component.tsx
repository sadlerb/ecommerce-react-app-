import {ShoppingIcon,CartIconContainer,ItemCount} from './cart-icon.styles'


import { useDispatch,useSelector } from 'react-redux'

import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

function CartIcon() {
    const cartCount = useSelector(selectCartCount)
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen)

    function toggleIsCartOpen(){

       dispatch(setIsCartOpen(!isCartOpen))
    }

    return(
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
    
)}

export default CartIcon