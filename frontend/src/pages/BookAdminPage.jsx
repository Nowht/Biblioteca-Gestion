import BookCatalog from "../components/layouts/BookCatalog"
import SectionHero from "../components/ui/SectionHero"
import Button from "../components/ui/Button"
import Modal from "../components/common/Modal"
import GenreBadge from "../components/books/GenreBadge"
import ErrorMessage, {getErrorMessage} from "../components/common/ErrorMessage"
import LoadingMessage from "../components/common/LoadingMessage"

import { Bookmark } from "lucide-react"

import { useState } from "react"

import { useGenres, useDeleteGenre } from "../hooks/useGenres"

import { useBooks } from "../hooks/useBooks"

function BookAdminPage() {


    const [searchquery, setSearchQuery] = useState("")
    const [isopen, setIsOpen] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState([])

    const { data:libros, isLoading: cargando, isError, error, refetch  } = useBooks(searchquery)
    const { data, isLoading } = useGenres()

    const { mutate } = useDeleteGenre()

    const handleSelect = (genero) => {
        setSelectedGenres((prev) =>
            prev.includes(genero)
                ? prev.filter(g => g !== genero)
                : [...prev, genero]
        )
    }

    const DeleteGenre = () => {
        mutate(selectedGenres)
        setSelectedGenres([])
        setIsOpen(false)
    }

    if (isLoading) return <LoadingMessage message="Cargando Libros..." />
    if (isError) return <ErrorMessage message={getErrorMessage(error)} retryFn={refetch} />

    return (
        <SectionHero
            title="Administración de Libros"
            paragraph="Gestiona el catálogo de libros de la biblioteca."
            createTo="/dashboard/books/add"
            onSearch={setSearchQuery}
            additionalbtn={<Button variant="secondary" onFunc={() => setIsOpen(true)} > <Bookmark size={20} /> Gestionar Generos</Button>}
        >
            <div className="flex flex-col h-[calc(100vh-240px)]">
                <div className="flex-1 overflow-y-auto">
                    <BookCatalog to="/dashboard/books/detail" className="py-32" books={libros} />
                </div>
            </div>
            <Modal isOpen={isopen} onClose={() => setIsOpen(false)} title="Generos" >
                <div className="grid grid-cols-2 gap-4">
                    {data && (data.map((e) => (
                        <GenreBadge
                            nombre={e.nombre}
                            key={e.id}
                            isSelected={selectedGenres.includes(e.id)}
                            onToggle={() => handleSelect(e.id)}
                        />)))}
                    {selectedGenres.length > 0 ?
                        (<Button variant="primary" className="col-span-2" onFunc={DeleteGenre} >Eliminar</Button>)
                        : (<Button variant="secondary" className="col-span-2" onFunc={() => setIsOpen(false)} >Cerrar</Button>)
                    }
                </div>
            </Modal>
        </SectionHero>
    )
}

export default BookAdminPage