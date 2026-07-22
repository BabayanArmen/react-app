import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import './../styles/modal.scss'

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
    
    useEffect(() => {
        console.log("open", open);
    }, [open]);

    if (!open) {
        return null
    }

    return createPortal(
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>,
        document.getElementById('modal-root')!
    )
}