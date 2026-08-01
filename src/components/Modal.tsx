import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import style from "../styles/modal.module.scss";

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
    const [visible, setVisible] = useState(open);
    
    useEffect(() => {
        if (open) {
            setVisible(true);
        }
    }, [open]);

    const handleAnimationEnd = () => {
        if (!open) {
            setVisible(false);
        }
    };

    if (!visible) return null;

    return createPortal(
        <div className={`${style.overlay} ${ !open ? style.close : ''}`} onClick={onClose}>
            <div 
                className={`${style.modal} ${ !open ? style.close : ''}`} 
                onAnimationEnd={handleAnimationEnd} 
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    )
}