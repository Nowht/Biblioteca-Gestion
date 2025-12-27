import BookCatalog from "../components/layouts/BookCatalog"
import SectionHero from "../components/ui/SectionHero"

function BookAdminPage() {
    return (
        <SectionHero title="Administración de Libros" paragraph="Gestiona el catálogo de libros de la biblioteca." createTo="/dashboard/books/add">
            <div className="flex flex-col h-[calc(100vh-240px)]">
                <div className="flex-1 overflow-y-auto">
                    <BookCatalog to="/dashboard/books/detail" className="py-32" />
                </div>
            </div>
        </SectionHero>
    )
}

export default BookAdminPage