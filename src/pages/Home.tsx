import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Home() {
    return (
        <>
            <div style={{ position: "sticky", top: '0' }}>
                <Navbar />
            </div>
            <Outlet/>
        </>
    )
}