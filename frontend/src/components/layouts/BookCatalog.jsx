import BookCard from "../books/BookCard"

function BookCatalog({to}) {
    return (
        <section className="grid grid-cols-2 my-4 mx-4 lg:grid-cols-4 gap-x-6 gap-y-4">
           <BookCard to={to}/>
           <BookCard to={to}/>
           <BookCard to={to}/>
           <BookCard to={to}/>
        </section>
    )
}

export default BookCatalog