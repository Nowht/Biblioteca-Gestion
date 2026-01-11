import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooks, getBook, newBook } from "../services/api";

export const useCreateBook = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newBookdata) => newBook(newBookdata),

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['books']})
        }
    })
}

export const useBooks = () => {
    return useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
        select: (response) => response.data
    })
}

export const useBook = (id) => {
    return useQuery({
        queryKey: ['books', id],
        queryFn: () => getBook(id),
        select: (response) => response.data,
        //enabled: !!id //solo se ejecuta si el ID existe
    })
}