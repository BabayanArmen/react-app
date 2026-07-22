import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/navbar.scss';
import { Modal } from './Modal';
import { useState } from 'react';

export function Navbar() {
    const [ open, setOpen] = useState<boolean>(false)

    const navigate = useNavigate();
    
    return (
        <>
            <div className='navbar_style'>
                <ul >
                    <li>
                        <NavLink to="profile" className={( { isActive } ) => isActive ? "active" : '' }>Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="notes" className={( { isActive } ) => isActive ? "active" : '' }>Notes</NavLink>
                    </li>
                    <li>
                        <NavLink to="reducer" className={( { isActive } ) => isActive ? "active" : '' }>UseReducer</NavLink>
                    </li>
                    <li>
                        <button className='logout' onClick={() => setOpen(true)}>Logout</button>
                    </li>
                </ul>
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <h2>Are you sure ?</h2>
                <button onClick={() => {navigate("/"); setOpen(false)}}>Yes</button>
                <button onClick={() => setOpen(false)}>No</button>
            </Modal>
        </>
    )
}