import { Link } from "react-router-dom"

function BookCard({ to, book }) {
    return (
        <article className="relative transition duration-300 ease-in-out md:hover:scale-105">
            <Link to={`${to}/${book.id}`} className="flex flex-col items-center md:p-4 space-y-4">
                <figure className="bg-brand-200 w-40">
                    {book.portada ? (
                        <img src={book.portada} alt={`Portada del libro: ${book.titulo}`} className="h-auto object-cover" />
                    ): <div className="h-auto">Sin portada</div>}
                </figure>
                <div className="text-center space-y-1">
                    <header>
                        <h3>{book.titulo}</h3>
                    </header>
                </div>
            </Link>
        </article>
    )
}

export default BookCard