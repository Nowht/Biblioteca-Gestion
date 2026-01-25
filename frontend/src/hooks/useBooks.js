import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooks, getBook, newBook, updateBook, deleteBook } from "../services/api";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export const useCreateBook = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (newBookdata) => newBook(newBookdata),

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['books']})
            toast.success("¡Libro creado correctamente!")
        },
        onError: ()=>{
            toast.error("Error al crear el libro. Intent de nuevo")
        }
    })
}

export const useBooks = (data) => {
    return useQuery({
        queryKey: ['books', data],
        queryFn: () => getBooks(data),
        select: (response) => response.data
    })
}

export const useBook = (id) => {
    return useQuery({
        queryKey: ['books', id],
        queryFn: () => getBook(id),
        select: (response) => response.data,
        enabled: !!id //solo se ejecuta si el ID existe
    })
}

export const useUpdateBook = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    return useMutation({
        // La función recibe el ID para la URL y los DATA para el cuerpo
        mutationFn: ({ id, data }) => updateBook(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            toast.success("Libro actualizado con éxito");
            navigate("/dashboard/books"); // Volver a la lista
        },
        onError: (error) => {
            toast.error("Error al actualizar: " + error.message);
        }
    });
};

export const useDeleteBook = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (id) => deleteBook(id),
        onSuccess: (data, variables) => {
            const deletedId = variables

            // Redirigir primero para evitar que la página actual re-renderice
            // y dispare un GET que ya no encontrará el elemento.
            navigate("/dashboard/books")

            // Eliminar la cache específica del libro
            queryClient.removeQueries({ queryKey: ["books", deletedId] })

            // Actualizar optimistamente la lista de libros en cache sin forzar refetch
            queryClient.setQueryData(["books"], (old) => {
                if (!old) return []
                return Array.isArray(old) ? old.filter((b) => b.id !== deletedId) : old
            })

            toast.success("Libro eliminado con exito")
        },
        onError: () => toast.error("Error al eliminar el libro")
    })
}