import { useState, useContext } from "react";
import "./App.css";
import CartContextProvider, { CartContext } from "../store/CartContext";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Modal from "./components/UI/Modal";
import Header from "./components/header";

function AppContent() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const cartCtx = useContext(CartContext);

  const handleOpenModel = () => setIsOpenModel(true);
  const handleCloseModel = () => setIsOpenModel(false);
  const handleOpenCheckout = () => {
    setIsOpenModel(false);
    setIsCheckoutOpen(true);
  };
  const handleCloseCheckout = () => setIsCheckoutOpen(false);

  return (
    <>
      <div className="p-4 bg-neutral-800">
        <Header onOpenCart={handleOpenModel} />

        <Meals />

        {/* Cart Modal */}
        <Modal
          isOpen={isOpenModel}
          onClose={handleCloseModel}
          className="max-w-3xl"
        >
          <Cart onClose={handleCloseModel} onCheckout={handleOpenCheckout} />
        </Modal>

        {/* Checkout Modal */}
        <Checkout
          checkoutOpen={isCheckoutOpen}
          cartData={cartCtx.items}
          onClose={handleCloseCheckout}
        />
      </div>
    </>
  );
}

function App() {
  return (
    <CartContextProvider>
      <AppContent />
    </CartContextProvider>
  );
}

export default App;
