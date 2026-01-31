import BookCatalog from "../components/layouts/BookCatalog"
import SectionHero from "../components/ui/SectionHero"
import Button from "../components/ui/Button"
import Modal from "../components/common/Modal"
import GenreBadge from "../components/books/GenreBadge"

import { Bookmark } from "lucide-react"

import { useState } from "react"

import { useGenres, useDeleteGenre } from "../hooks/useGenres"

function BookAdminPage() {

    const [searchquery, setSearchQuery] = useState("")
    const [isopen, setIsOpen] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState([])

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
                    <BookCatalog to="/dashboard/books/detail" className="py-32" query={searchquery} />
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