import BookCard from "../books/BookCard"
import { useBooks } from "../../hooks/useBooks"

import { useEffect } from "react"

function BookCatalog({ to, query }) {

    const { data: books, isLoading, isError, error } = useBooks(query)
    //Se define la consulta
    // useEffect(() => {
    //     const { data: books, isLoading, isError, error } = useBooks(query)
    // }, [query])

    // TanStack Query maneja los estados
    if (isLoading) return <div>Cargando biblioteca...</div>
    if (isError) return <div>Error: {error.message}</div>

    return (
        <section className="grid grid-cols-2 my-4 mx-4 lg:grid-cols-4 gap-x-6 gap-y-4">
            {books.map((book) => (
                <BookCard to={to} key={book.id} book={book} />
            ))}
        </section>
    )
}

export default BookCatalog