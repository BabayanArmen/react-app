import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import style from '../styles/Drawer.module.scss';

export interface SideBarModalProps {
    open: boolean,
    onClose: () => void,
    children: ReactNode
}

export function Drawer({open, onClose, children} : SideBarModalProps) {
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
        <>
            <div className={`${style.drawer_overlay} ${ !open ? style.close : '' }`} onClick={onClose}></div>
            <div className={`${style.drawer} ${ !open ? style.close : '' }`} onAnimationEnd={handleAnimationEnd}>{children}</div>
        </>,
        document.getElementById("modal-root")!
    )
}