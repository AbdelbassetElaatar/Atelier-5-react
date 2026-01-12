import React from "react";
import logo from "../assets/logo.jpg";

function Header({ onOpenCart }) {
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
          className="bg-green-400 ml-5 px-3 py-2 rounded font-bold text-white"
        >
          Cart 🛒
        </button>
      </div>
    </header>
  );
}

export default Header;
