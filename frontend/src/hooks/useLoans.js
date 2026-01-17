import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getLoans, newLoan } from "../services/api"

import { toast } from "react-hot-toast"

import { useNavigate } from "react-router-dom"

export const useLoans = () => {
    return useQuery({
        queryKey: ['prestamos'],
        queryFn: getLoans,
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
        }  
    })

}