import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getLoans, newLoan, updatLoan, renewLoan } from "../services/api"

import { toast } from "react-hot-toast"

import { useNavigate } from "react-router-dom"

export const useLoans = (data) => {
    return useQuery({
        queryKey: ['prestamos', data],
        queryFn: () => getLoans(data),
        select: (response) => response.data
    })
}

export const useCreateLoan = () => {
    const querClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (data) => newLoan(data),
        onSuccess: () => {
            querClient.invalidateQueries({ queryKey: ['prestamos'] })
            navigate('/dashboard/loans')
            toast.success("¡Prestamo creado con exito!")
        },
        onError: (error) => toast.error("Error: " + error.response?.data)
    })

}

export const useUpdateLoan = (isRenewal=false) => {
    const querClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, data}) => isRenewal ? renewLoan(id,data) : updatLoan(id,data),
        onSuccess: () => {
            querClient.invalidateQueries({ queryKey: ['prestamos'] })
            querClient.invalidateQueries({ queryKey: ['books'] })

            const message = isRenewal ? "¡Prestamo Renovado!" : "¡Prestamo Actualizado!"

            toast.success(message)
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || "Error al procesar la operación")
        }
    })

}