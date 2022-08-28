import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector,useDispatch } from "react-redux";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'


import { NavigationContainer,NavLink,LogoContainer,NavLinksContainer } from "./navbar.styles";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {selectCurrentUser} from '../../store/user/user.selector'
import { signOutStart } from "../../store/user/user.action";

function NavBar(){
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  
  const signOutUser = () => dispatch(signOutStart())


    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo className="logo"/>
          </LogoContainer>
          <NavLinksContainer>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
              currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
              ) :  (
              <NavLink to='/auth'>
                SIGN IN
              </NavLink>)
            }
          <CartIcon />
          </NavLinksContainer>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

export default NavBar;