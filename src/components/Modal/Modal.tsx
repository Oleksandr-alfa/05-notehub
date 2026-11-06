import { createPortal } from "react-dom";

import css from "./Modal.module.css";
interface ModalProps {
    children: React.ReactNode ,
}


function Modal({children}: ModalProps) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;
    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
        >
            <div className={css.modal}>
                {children}
            </div>
        </div>,
modalRoot
    )
}

export default Modal;