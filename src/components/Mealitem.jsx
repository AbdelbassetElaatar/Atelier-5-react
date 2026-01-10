import React, { useContext } from "react";
import { formattedPrice } from "../../util/formatting";
import Button from "./UI/Button";
import { CartContext } from "../../store/CartContext";
function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  function addToCartHandler() {
    cartCtx.addItem({
      id: meal.id,
      title: meal.name,
      price: Number(meal.price),
      description: meal.description,
    });
  }
  console.log("Cart Context:", cartCtx);

  const price = formattedPrice.format(Number(meal.price).toFixed(2));

  return (
    <div
      className="w-96 rounded-2xl overflow-hidden shadow-xl border border-neutral-800"
      style={{ backgroundColor: "#1d1b16" }}
    >
      <div className="h-56 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL || "/api"}/${meal.image}`}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">{meal.name}</h2>

        <div
          className="inline-block mb-4 px-6 py-1 rounded-lg text-yellow-400 font-semibold text-lg"
          style={{ backgroundColor: "#322c1d" }}
        >
          {price}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          {meal.description}
        </p>

        <Button
          textOnly
          onClick={addToCartHandler}
          className="w-1/2 py-3 rounded-lg font-semibold transition bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default MealItem;
