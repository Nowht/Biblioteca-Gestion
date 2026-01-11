import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getGenres, newGenre } from "../services/api";

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
        },
    })
}