import { useQuery } from "react-query";
import useAuth from "./useAuth/useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useCart = () => {
    const { user, loading } = useAuth();
   
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [cart, refetch]

}
export default useCart;