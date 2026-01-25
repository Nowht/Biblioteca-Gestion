import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getUsers, newUser, getUser, updateUser, deleteUser } from "../services/api";

import toast from "react-hot-toast";

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newUserData) => newUser(newUserData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

}

export const useUsers = (data) => {
    return useQuery({
        queryKey: ['users', data],
        queryFn: () => getUsers(data) ,
        select: (response) => response.data.map(user => ({
            ...user,
            date_joined: new Date(user.date_joined).toLocaleDateString('es-ES')
        })),
        staleTime: 5 * 60 * 1000
    })
}

export const useUser = (id) => {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => getUser(id),
        select: (response) => response.data,
        enabled: !!id
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }) => updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success("¡El Usuario se ha actualizado exitosamente!")
        },
        onError: (error) => toast.error("Error al actualizar: " + error.message)
    })

}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success("¡Usuario eliminado con exito!")
        }
    })
}