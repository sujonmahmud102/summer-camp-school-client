import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth/useAuth";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";




const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || isAdminLoading || isInstructorLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div>
                <progress className="progress w-56"></progress>
            </div>
        </div>
    }

    if (user && !(isAdmin || isInstructor)) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default StudentRoute;