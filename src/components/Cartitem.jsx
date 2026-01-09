import React from "react";
import Button from "../../components/UI/Button";

function CartItem({ title, price, quantity, onAdd, onRemove }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <div>
        <p className="font-medium">
          {title} - {quantity} X ${price.toFixed(2)}{" "}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          onClick={onRemove}
          className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition"
          textOnly
        >
          {" "}
          -
        </Button>
        <span className="w-5 text-center">{quantity}</span>
        <Button
          onClick={onAdd}
          className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition"
          textOnly
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
