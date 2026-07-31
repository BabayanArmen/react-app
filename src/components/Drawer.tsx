import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import '../styles/Drawer.scss';

export interface SideBarModalProps {
    open: boolean,
    onClose: () => void,
    children: ReactNode
}

export function Drawer({open, onClose, children} : SideBarModalProps) {

    if (!open) return;
    
    return createPortal(
        <>
            <div className="drawer_overlay" onClick={onClose}></div>
            <div className="drawer">{children}</div>
        </>,
        document.getElementById("modal-root")!
    )
}