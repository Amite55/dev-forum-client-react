import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    const axiosSecure = useAxiosSecure();

    // fetch user info using logged in user email =
    const {data: users = '', isLoading} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/users`);
            return data
        }
    })
    return [users, isLoading]
};

export default useUsers;