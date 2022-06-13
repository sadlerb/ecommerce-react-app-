import './checkout-item.styles.scss'

import { useContext } from 'react'
import { CartContext } from '../../context/cart-context'

function CheckoutItem({cartItem}) {
    const{name,imageUrl,price,quantity} = cartItem
    const {clearItemFromCart,addItemToCart,removeItemFromCart} = useContext(CartContext)

    const clearItemHandeler = () => clearItemFromCart(cartItem)
    const addItemHandeler = () => addItemToCart(cartItem)
    const removeItemHandeler =() => removeItemFromCart(cartItem)

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