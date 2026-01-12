import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import { CartContext } from "../../store/CartContext";

function Header({ onOpenCart }) {
  const cartCtx = useContext(CartContext);
  const totalItems = cartCtx.items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <header className="p-4 bg-neutral-800 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 object-contain rounded-full"
        />
        <h1 className="text-white font-bold ml-3">Food App</h1>
      </div>

      <div>
        <button
          onClick={onOpenCart}
          className="bg-green-400 ml-5 px-3 py-2 rounded font-bold text-white flex items-center"
        >
          <span>Cart 🛒</span>
          {totalItems > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
