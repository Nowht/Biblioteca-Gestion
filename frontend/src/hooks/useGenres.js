import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getGenres, newGenre, getGenre } from "../services/api";

import { toast } from "react-hot-toast"

export const useGenre = (id) => {
    return useQuery({
        queryKey: ['genres', id],
        queryFn: () => getGenre(id),
        select: (response) => response.data,
        enabled: !!id // solo se ejecuta si el ID existe
    })
}

export const useGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
        select: (response) => response.data
    })
}

export const useCreateGenre = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newGenreData) => newGenre(newGenreData),

        onSuccess: () => {
            queryClient.invalidateQueries('genres')
            toast.success("Genero creado con exito")
        },
        onError: () => {
            toast.error("Error al crear el genero")
        }
    })
}