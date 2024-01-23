import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/card-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const {isLoading, error, sendRequest: onCheckout} = useHttp();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = (event) => {
    event.preventDefault();
    setIsCheckout(true);
  };

  const onCheckoutHandler = async(data) => {

    const checkoutData = {
      user: data,
      itemsordered: cartCtx.items,
    }
    const validateData = (data) => {
      console.log(data);
    }
    
      await onCheckout({
        url:"https://react-http-95190-default-rtdb.firebaseio.com/orders.json",
        method: 'POST',
        body: JSON.stringify(checkoutData)
      }, validateData )
      setIsSubmitted(true);
      props.onClose();
      cartCtx.reset();
  }

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        // <li key={item.id}>{item.name}</li>
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const cardContent = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
    </React.Fragment>
  )
  const cardButtons = (
    <React.Fragment>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && (
          <button
            type="submit"
            onClick={orderHandler}
            className={classes.button}
          >
            Order
          </button>
        )}
      </div>
    </React.Fragment>
  );
  const errorContent = <p>{error}</p> 

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !error && cardContent}
      {!isCheckout && cardButtons}
      {isCheckout && !isLoading && !isSubmitted &&  <Checkout onCheckout={onCheckoutHandler} />}
      {error && !isLoading && errorContent }
      {isLoading && !error && <p>submitting Data.....</p>}
      {!isLoading && !error && isSubmitted && <p>Successfuly submitted Data.</p>}
    </Modal>
  );
};

export default Cart;
