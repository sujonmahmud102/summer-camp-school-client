import useAuth from "./useAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useInstructor = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ['isInstructor', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
            // console.log(res.data)
            return res.data.instructor;
        }
    })
    return [isInstructor, isInstructorLoading]
}
export default useInstructor;