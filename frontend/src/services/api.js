import axios from "axios"

const api = axios.create({
    baseURL:"http://127.0.0.1:8000/api/"
})

// Dentro de api.js
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export const getBooks = () => api.get('libro/')
export const getBook = (id) => api.get(`libro/${id}/`)

export const logIn = (data) => api.post('token/', data)

export const getDashboardStats = () => api.get('dashboard-stats/')

export const getChartStats = () => api.get('chart-stats/')

export const getUsers = () => api.get('users/')