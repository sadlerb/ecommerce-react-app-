import './product-card.styles.tsx'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import { useDispatch,useSelector} from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { Footer, Name, Price, ProductCartContainer } from './product-card.styles';
import { CategoryItem } from '../../store/categories/category.type';
import { FC } from 'react';

type ProductCardProps = {
    product: CategoryItem
}

const  ProductCard:FC<ProductCardProps> = ({product}) => {
    const dispatch = useDispatch();
    const{name,price,imageUrl} = product
    const cartItems = useSelector(selectCartItems)
    function addProductToCart(){
        dispatch(addItemToCart(cartItems,product));
    }

    return(
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Cart</Button>
        </ProductCartContainer>
    )
}

export default ProductCard