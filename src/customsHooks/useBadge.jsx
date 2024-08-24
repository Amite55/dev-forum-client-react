import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useBadge = () => {
    const {user, loading} =  useAuth();
    const axiosSecure = useAxiosSecure();

    // fetch user info using logged in user email =
    const {data: badge = '', isLoading} = useQuery({
        queryKey: ['badge', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/user/${user?.email}`);
            return data.badge;
        }
    })
    return [badge, isLoading];
};

export default useBadge;