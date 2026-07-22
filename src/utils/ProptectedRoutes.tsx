import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const user = {};
    return user ? <Outlet /> : <Navigate to="/"/>
}

export default ProtectedRoutes;