import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, children, onClose, className = "" }) {
  const dialogRef = useRef();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (typeof dialog.showModal === "function") dialog.showModal();
    } else {
      if (typeof dialog.close === "function") dialog.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={`w-11/12 max-w-xl rounded-xl bg-[#f5f2eb] p-6 shadow-2xl backdrop:bg-black/70 animate-fadeIn ${className}`}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
