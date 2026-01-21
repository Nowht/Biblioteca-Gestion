import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getChartStats, getRecentStats } from "../services/api";

export const useStats = () => {
    return useQuery({
        queryKey: ['stats', 'dashboard'],
        queryFn: getDashboardStats,
        select: (response) => response.data,

        staleTime: 5 * 60 * 1000, // 5 minutos
    })
}

export const useChartStats = () => {
    return useQuery({
        queryKey: ['stats', 'chart'],
        queryFn: getChartStats,
        select: (response) => {
            const { prestamos, usuarios } = response.data;

            return {
                prestamos: {
                    labels: prestamos.map(item => new Date(item.fecha).toLocaleDateString('es-ES',{ weekday: 'short'})),
                    values: prestamos.map(item => item.total),
                },
                usuarios: {
                    labels: usuarios.map(item => new Date(item.fecha).toLocaleDateString('es-ES',{weekday:'short'})),
                    values: usuarios.map(item => item.total)
                }
            }

        },
        staleTime: 5 * 60 * 1000
    })
}

export const useRecentStats = () => {
    return useQuery({
        queryKey: ['stats', 'recent'],
        queryFn: getRecentStats,
        select: (response) => response.data,
        staleTime: 5 * 60 * 1000
    })
}