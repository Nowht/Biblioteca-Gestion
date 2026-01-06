import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/api";

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        select: (response) => response.data.map(user => ({
            ...user,
            date_joined: new Date(user.date_joined).toLocaleDateString('es-ES')
        })),
        staleTime: 5 * 60 * 1000
    })
}