import './checkout-item.styles.scss'

import { useSelector,useDispatch } from 'react-redux';
import { addItemToCart,removeItemFromCart,clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

function CheckoutItem({cartItem}) {
    const{name,imageUrl,price,quantity} = cartItem
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()


    const clearItemHandeler = () => dispatch(clearItemFromCart(cartItems,cartItem))
    const addItemHandeler = () => dispatch(addItemToCart(cartItems,cartItem))
    const removeItemHandeler =() => dispatch(removeItemFromCart(cartItems,cartItem))

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandeler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandeler}>&#10095;</div>
                </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandeler}>&#10005;</div>
        </div>
    )
}


export default CheckoutItem