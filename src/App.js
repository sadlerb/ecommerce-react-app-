import { Routes,Route} from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./routes/home/home.component";
import NavBar from "./routes/navbar/navbar.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component"
import Checkout from "./routes/checkout/checkout.component";

import { useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";


function App() {
  const dispatch = useDispatch();

  useEffect(() =>{
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user){
            createUserDocumentFromAuth(user)
          
        }
        dispatch(setCurrentUser(user))

    })

    return unsubscribe
},[dispatch])


  return ( 
    <Routes>
      <Route path="/" element={<NavBar />}> 
      <Route index element={<Home />} /> 
      <Route path='shop/*' element={<Shop />} /> 
      <Route path='auth' element={<Authentication />} /> 
      <Route path='checkout' element={<Checkout />} /> 
      </Route>
    </Routes>
    );
}

export default App;
