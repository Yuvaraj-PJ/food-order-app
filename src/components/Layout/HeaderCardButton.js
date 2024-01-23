import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";
import CartContext from "../../store/card-context";

const HeaderCardButton = (props) => {
  const [btnIsHighlighted, setBtnisHighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((cardNumber, item) => {
    return (cardNumber += item.amount);
  }, 0);
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnisHighted(true);
    const timer = setTimeout(() => {
      setBtnisHighted(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Your Card </span>
      <span className={classes.badge}> {numberOfCartItems} </span>
    </button>
  );
};

export default HeaderCardButton;
