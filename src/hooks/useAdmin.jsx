import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth/useAuth";
import { useQuery } from "react-query";

const useAdmin = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            // console.log(res.data)
            return res.data.admin;
        }
    })
    return [isAdmin, isAdminLoading]
}
export default useAdmin;