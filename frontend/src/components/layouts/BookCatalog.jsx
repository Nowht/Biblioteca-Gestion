import BookCard from "../books/BookCard"
import ErrorMessage, { getErrorMessage } from "../common/ErrorMessage"
import LoadingMessage from "../common/LoadingMessage"

function BookCatalog({ to, books }) {

    return (
        <section className="grid grid-cols-2 my-4 mx-4 lg:grid-cols-4 gap-x-6 gap-y-4">
            {books?.map((book) => (
                <BookCard to={to} key={book.id} book={book} />
            ))}
        </section>
    )
}

export default BookCatalog