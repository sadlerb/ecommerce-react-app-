import { Outlet,Link } from "react-router-dom";
import { Fragment,useContext } from "react";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart-context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navbar.styles.scss'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

function NavBar(){
  const {currentUser} = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)
  console.log()


    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to='/'>
            <CrwnLogo className="logo"/>
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>
                SHOP
            </Link>
            {
              currentUser ? (
              <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
              ) :  (
              <Link className="nav-link" to='/auth'>
                SIGN IN
              </Link>)
            }
          <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
  }

export default NavBar;