import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
})

// INTERCEPTOR DE PETICIÓN: Pone el token en el Header automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes("token/")) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh")
                const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    refresh: refreshToken
                })

                localStorage.setItem("access", res.data.access)

                originalRequest.headers.Authorization = `Bearer ${res.data.access}`
                return api(originalRequest)
            } catch (err){
                localStorage.clear()
                window.location.href = '/'
            }
        }
        return Promise.reject(error)
    }
)

// Endpoints de libros
export const getBooks = (data) => api.get(`libro/?search=${data}`)
export const getBook = (id) => api.get(`libro/${id}/`)
export const newBook = (data) => api.post('libro/', data)
export const updateBook = (id, data) => api.put(`libro/${id}/`, data)
export const deleteBook = (id) => api.delete(`libro/${id}/`)

// Endpoint para login
export const logIn = (data) => api.post('token/', data)

// Endpoints para dashboard
export const getDashboardStats = () => api.get('dashboard-stats/')
export const getChartStats = () => api.get('chart-stats/')
export const getRecentStats = () => api.get('recent-stats/')

// Endpoints para usuarios
export const getUsers = (data) => api.get(`users/?search=${data}`)
export const getUser = (id) => api.get(`users/${id}/`)
export const newUser = (data) => api.post('users/', data)
export const updateUser = (id, data) => api.put(`users/${id}/`, data)
export const deleteUser = (id) => api.delete(`users/${id}/`)

// Endpoints para generos
export const getGenres = () => api.get('genero/')
export const getGenre = (id) => api.get(`genero/${id}/`)
export const newGenre = (data) => api.post('genero/', data)

//Endpoints para prestamos
export const getLoans = (search = "", isReturned = null) => api.get('prestamo/', 
    { params: { search: search, devuelto: isReturned} })
export const getLoan = (id) => api.get(`prestamo/${id}/`)
export const newLoan = (data) => api.post('prestamo/', data)
export const updatLoan = (id, data) => api.put(`prestamo/${id}/`, data)
export const renewLoan = (id, data) => api.patch(`prestamo/${id}/`, data)
