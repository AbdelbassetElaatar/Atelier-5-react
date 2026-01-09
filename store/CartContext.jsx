import { createContext, useReducer } from "react";

//Contexte
const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

//actions
const cartActionsTypes = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_CART: "CLEAR_CART",
};

//reducer
function cartReducer(state, action) {
  switch (action.type) {
    case cartActionsTypes.ADD_ITEM: {
      const itemExist = state.items.find((it) => it.id == action.payload.id);
      let newTab = [];
      if (itemExist) {
        newTab = state.items.map((it) =>
          it.id === action.payload.id
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      } else {
        newTab = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { ...state, items: newTab };
    }
    case cartActionsTypes.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    case cartActionsTypes.CLEAR_CART: {
      return { ...state, items: [] };
    }
    default: {
      return state;
    }
  }
}

//reducer
const initialState = {
  items: [],
  totalAmount: 0,
};

export function CartContextProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  function addItem(item) {
    dispatch({ type: cartActionsTypes.ADD_ITEM, payload: item });
  }
  function removeItem(id) {
    dispatch({ type: cartActionsTypes.REMOVE_ITEM, payload: id });
  }
  function clearCart() {
    dispatch({ type: cartActionsTypes.CLEAR_CART });
  }
  const CartContexteValue = {
    items: cartState.items,
    totalAmount: cartState.items.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0
    ),
    addItem,
    removeItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={CartContexteValue}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContextProvider;
export { CartContext };
