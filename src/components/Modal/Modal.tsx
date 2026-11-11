import { createPortal } from "react-dom";

import css from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
    children: React.ReactNode,
    onClose: () => void;
}


function Modal({children, onClose}: ModalProps) {
   
    useEffect(() => {
        const handleKeyBoardClick = (e: KeyboardEvent) => {
            if (e.key === 'Escape')
                onClose();
        }
        document.addEventListener('keydown', handleKeyBoardClick);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyBoardClick);
             document.body.style.overflow = '';
        }
    }, [onClose])

     const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
         if(e.target === e.currentTarget)
           
            
            onClose();
    }
    
     const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;
    
    return createPortal(
        <div
            onClick={handleBackdropClick}
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
        >
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
modalRoot
    )
}

export default Modal;