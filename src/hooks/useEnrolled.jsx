import { useQuery } from "react-query";
import useAuth from "./useAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useEnrolled = () => {
    const { user, loading } = useAuth();

    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: enrolled = [] } = useQuery({
        queryKey: ['enrolled', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/enrolled?email=${user?.email}`)
            // console.log('res from axios', res)
            return res.data;
        },
    })

    return [enrolled, refetch]
};

export default useEnrolled;