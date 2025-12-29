import axios from "axios"

const booksApi = axios.create({
    baseURL:"http://127.0.0.1:8000/api/libro/"
})

export const getBooks = () => booksApi.get()
export const getBook = (id) => booksApi.get(`/${id}/`)