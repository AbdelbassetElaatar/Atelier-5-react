import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, children, onClose }) {
  const dialogRef = useRef();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="
        w-11/12 max-w-xl
        rounded-xl
        bg-[#f5f2eb]
        p-6
        shadow-2xl
        backdrop:bg-black/70
        animate-fadeIn
      "
    >
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
