import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth/useAuth";
import useInstructor from "../hooks/useInstructor";



const InstructorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || isInstructorLoading) {
        return <div className="flex justify-center items-center h-screen">
            <div>
                <progress className="progress w-56"></progress>
            </div>
        </div>
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default InstructorRoute;