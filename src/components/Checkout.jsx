import React, { useState, useEffect, useContext } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { sendCheckoutData } from "../../hooks/useHttp";
import Modal from "./UI/Modal";
import { CartContext } from "../../store/CartContext";

function Checkout({ checkoutOpen, cartData, onClose }) {
  const cartCtx = useContext(CartContext);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);

  const [checkoutIsOpen, setCheckoutIsOpen] = useState(checkoutOpen);
  const [isSubmiteed, setIsSubmitted] = useState(false);

  useEffect(() => {
    setCheckoutIsOpen(checkoutOpen);
  }, [checkoutOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    const response = await sendCheckoutData(formData, cartData);

    if (!response.ok || response.status === 400 || response.status === 500) {
      newErrors.push(response.message || "Failed to submit order");
      setErrors(newErrors);
      return;
    }

    if (response.status === 201) {
      setCheckoutIsOpen(false);
      setIsSubmitted(true);
      // clear cart and auto-close success dialog after a short delay
      try {
        cartCtx.clearCart();
      } catch {
        // ignore if context unavailable
      }
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <>
      <Modal
        isOpen={checkoutIsOpen}
        onClose={onClose}
        className="bg-neutral-100 rounded-md shadow-lg p-6"
      >
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h1 className="font-bold text-2xl text-gray-700 text-center">
            Checkout
          </h1>
          {errors.map((err, key) => (
            <p className="text-red-500 text-center font-bold" key={key}>
              {err}
            </p>
          ))}
          <form onSubmit={handleSubmit} className="w-[80%]">
            <Input
              label={"Email"}
              type={"email"}
              required={true}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label={"Full Name"}
              type={"text"}
              required={true}
              name={"name"}
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label={"Street"}
              type={"text"}
              required={true}
              name={"street"}
              value={formData.street}
              onChange={handleChange}
            />
            <div className="flex">
              <Input
                className="w-1/2"
                label={"Code Postal"}
                type={"number"}
                required={true}
                name={"postal-code"}
                value={formData["postal-code"]}
                onChange={handleChange}
              />
              <Input
                className=" ml-2 w-1/2"
                label={"City"}
                type={"text"}
                required={true}
                name={"city"}
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <Button className="mt-5 float-end" type={"submit"}>
              Submit
            </Button>
          </form>
        </div>
      </Modal>
      <Modal isOpen={isSubmiteed}>
        <div className="w-full h-full bg-white p-8">
          <h1 className="font-bold text-lg mb-3">Congrats {formData.name}</h1>
          <p>Your order has been submitted successfully! ✅</p>
        </div>
      </Modal>
    </>
  );
}

export default Checkout;
