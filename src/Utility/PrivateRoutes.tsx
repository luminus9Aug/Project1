import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";


const PrivateRoutes = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;