import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth/useAuth";
import useAdmin from "../hooks/useAdmin";



const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div>
                <progress className="progress w-56"></progress>
            </div>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;