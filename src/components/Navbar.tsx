import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/navbar.scss';
import { Modal } from './Modal';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { useIsMobile } from '../custom-hooks/useIsMobile';

export function Navbar() {
    const [ open, setOpen] = useState<boolean>(false);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const isMobile = useIsMobile();

    const navigate = useNavigate();
    
    return (
        <>
            <div className='navbar_style'>
                <ul >

                    {isMobile && (
                        <>
                        <li onClick={() => setDrawerOpen(true)}>
                            <a style={{color: 'white'}}>Menu</a>
                        </li>
                        <li></li>
                        </>
                    )}

                    {!isMobile && (
                        <>
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
                                <NavLink to="users" className={( { isActive } ) => isActive ? "active" : '' }>Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="filterExampleWithTable" className={( { isActive } ) => isActive ? "active" : '' }>Filter With Table</NavLink>
                            </li>
                            <li>
                                <NavLink to="react-hook-form" className={( { isActive } ) => isActive ? "active" : '' }>React Hook Form</NavLink>
                            </li>
                            <li>
                                <button className='logout' onClick={() => setOpen(true)}>Logout</button>
                            </li>
                        </>
                    )}
                    
                </ul>
            </div>

            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
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
                        <NavLink to="users" className={( { isActive } ) => isActive ? "active" : '' }>Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="filterExampleWithTable" className={( { isActive } ) => isActive ? "active" : '' }>Filter With Table</NavLink>
                    </li>
                    <li>
                        <NavLink to="react-hook-form" className={( { isActive } ) => isActive ? "active" : '' }>React Hook Form</NavLink>
                    </li>
                    <li>
                        <button className='logout' onClick={() => setOpen(true)}>Logout</button>
                    </li>
                </ul>

            </Drawer>

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