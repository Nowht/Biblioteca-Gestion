import { useQuery } from "@tanstack/react-query";
import { getBooks, getBook } from "../api/books";

//Hook para todos los libros
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