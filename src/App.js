import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/cartProvider";

function App() {
  const [cardIsShown, setCartIsShown] = useState(false);
  const showCartHander = () => {
    setCartIsShown(true);
  }
  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cardIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHander}/>
      <Meals />
    </CartProvider> 
  );
}

export default App;
