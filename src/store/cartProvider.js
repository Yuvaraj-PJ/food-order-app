import CartContext from "./card-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exisingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (exisingCartItem) {
      const updatedItem = {
        ...exisingCartItem,
        amount: exisingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: +updatedTotalAmount.toFixed(2),
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisingItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (exisingItem.amount > 1) {
      const updatedItem = {
        ...exisingItem,
        amount: exisingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else if (exisingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    const updatedTotalAmount = state.totalAmount - exisingItem.price;
    return {
      items: updatedItems,
      totalAmount: +updatedTotalAmount.toFixed(2)
    };
  }
  if(action.type === 'RESET'){
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const resetHandler = () => {
    dispatchCartAction({type: 'RESET'})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    reset: resetHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
