import { NavLink, useNavigate } from "react-router";
import { useIsMobile } from '../custom-hooks/useIsMobile';
import '../styles/navbar.scss';
import { useState } from "react";
import { Modal } from "./Modal";
import { Drawer } from "./Drawer";

export function Navbar() {
    const [ open, setOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useIsMobile();
    const navigate = useNavigate();

    return (
        <>
            <nav>
                {isMobile && (
                    <span className="menu" onClick={() => setDrawerOpen(true)}>Menu</span>
                )}
                {!isMobile && (
                    <>
                        <NavLink to="profile" end>Profile</NavLink>
                        <NavLink to="notes" end>Notes</NavLink>
                        <NavLink to="reducer" end>Reducer</NavLink>
                        <NavLink to="users" end>Users</NavLink>
                        <NavLink to="filterExampleWithTable" end>Filter Example With Table</NavLink>
                        <NavLink to="react-hook-form" end>React-hook-form</NavLink>
                        <NavLink to="react-hook-form-zod" end>React-hook-form-zod</NavLink>
                        <span className='logout' onClick={() => setOpen(true)}>Logout</span>
                    </>
                )}
            </nav>

            <Modal open={open} onClose={() => setOpen(false)}>
                <h2>Are you sure ?</h2>
                <button onClick={() => {navigate("/"); setOpen(false)}}>Yes</button>
                <button onClick={() => setOpen(false)}>No</button>
            </Modal>

            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <div className='mobile_navbar'>
                    <NavLink to="profile" onClick={() => setDrawerOpen(false)}>Profile</NavLink>
                    <NavLink to="notes" onClick={() => setDrawerOpen(false)}>Notes</NavLink>
                    <NavLink to="reducer" onClick={() => setDrawerOpen(false)}>UseReducer</NavLink>
                    <NavLink to="users" onClick={() => setDrawerOpen(false)}>Users</NavLink>
                    <NavLink to="filterExampleWithTable" onClick={() => setDrawerOpen(false)}>Filter With Table</NavLink>
                    <NavLink to="react-hook-form" onClick={() => setDrawerOpen(false)}>React Hook Form</NavLink>
                    <NavLink to="react-hook-form-zod" onClick={() => setDrawerOpen(false)}>React Hook Form with Zod</NavLink>
                    <button className='mobile_logout' onClick={() => setOpen(true)}>Logout</button>
                </div>
            </Drawer>
        </>
    );
}