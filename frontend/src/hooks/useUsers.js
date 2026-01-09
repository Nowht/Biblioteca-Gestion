import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUsers, newUser } from "../services/api";

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newUserData) => newUser(newUserData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

}

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