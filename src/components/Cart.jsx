import React, { useContext } from "react";
import { CartContext } from "../../store/CartContext";
import CartItem from "./Cartitem";
function Cart({ onClose, onCheckout }) {
  const cartCtx = useContext(CartContext);
  const totalItems = cartCtx.items.reduce((sum, it) => sum + it.quantity, 0);
  if (cartCtx.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">your cart ({totalItems})</h1>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            close
          </button>
        </div>
        <p className="text-center py-8 text-gray-600">Your cart is empty</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">your cart ({totalItems})</h1>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {cartCtx.items.map((it) => (
          <CartItem
            key={it.id}
            title={it.title}
            price={it.price}
            onAdd={() => cartCtx.addItem(it)}
            quantity={it.quantity}
            onRemove={() => cartCtx.removeItem(it.id)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6 font-semibold text-lg">
        <span>Total</span>
        <span>${cartCtx.totalAmount.toFixed(2)}</span>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          close
        </button>
        <button
          className="px-4 py-2 rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500 transition"
          onClick={onCheckout}
        >
          Go to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
