
import {FC} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addItemToCart,removeItemFromCart,clearItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.type';
import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value } from './checkout-item.styles';

type CheckoutItemProps = {
    cartItem: CartItem;
};


const CheckoutItem: FC<CheckoutItemProps> = ({cartItem}) => {
    const{name,imageUrl,price,quantity} = cartItem
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()


    const clearItemHandeler = () => dispatch(clearItemFromCart(cartItems,cartItem))
    const addItemHandeler = () => dispatch(addItemToCart(cartItems,cartItem))
    const removeItemHandeler =() => dispatch(removeItemFromCart(cartItems,cartItem))

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandeler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandeler}>&#10095;</Arrow>
                </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandeler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}


export default CheckoutItem