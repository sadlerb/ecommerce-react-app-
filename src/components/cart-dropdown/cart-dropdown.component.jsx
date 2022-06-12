import './cart-dropdown.styles.scss'

import Button from '../button/button.component'

function CartDropdown(){
 return(
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
            <Button>
                Add To Cart
            </Button>
        </div>

    </div>
 )   
}

export default CartDropdown