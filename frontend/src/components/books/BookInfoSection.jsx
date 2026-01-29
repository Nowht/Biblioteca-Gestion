import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"
import BookStatusBadge from "../books/BookStatusBadge"
import GenreBadge from "./GenreBadge";

import Modal from "../common/Modal";
import ConfirmActionModal from "../modalcontent/ConfirmActionModal";

import { AuthContext } from "../../context/AuthContext"

import { Pencil, Trash2 } from "lucide-react";

import { useState, useContext } from "react";

import { useDeleteBook } from "../../hooks/useBooks";

function BookInfoSection({ info }) {

    const [selectedContent, setSelectedContent] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const deleteBookMutation = useDeleteBook()

    const { user } = useContext(AuthContext)

    const openDelete = (bookdata) => {
        setSelectedContent(bookdata);
        setIsDeleteOpen(true)
    }

    const esReservable = info.estado?.toLowerCase() === "disponible";
    const textoBoton = esReservable ? "Reservar Libro" : "No disponible para reserva";

    return (
        <section className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-100">
            {/* Título y disponibilidad - Usamos flex para poner la insignia al lado */}
            <header className="mb-4 pb-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <h1 className="text-xl md:text-3xl font-extrabold text-gray-900">
                        {info.titulo}
                    </h1>
                    {/* La insignia se muestra junto al título */}
                    <BookStatusBadge status={info.estado} />
                </div>

                {user?.isStaff && (
                    <div className="flex">
                        <Button variant="deletenobg" onFunc={() => openDelete(info)}>
                            <Trash2 />
                        </Button>
                        <ButtonLink variant="edit" to={`/dashboard/books/edit/${info.id}`}>
                            <Pencil />
                        </ButtonLink>
                    </div>
                )}
            </header>

            {/* Información del Libro */}
            <div className="space-y-3 text-gray-700">
                {/* Autor */}
                <p className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">Autor:</span>
                    <span className="text-gray-900">{info.autor}</span>
                </p>

                {/* ISBN */}
                <p className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">ISBN:</span>
                    <span className="text-gray-900">{info.isbn}</span>
                </p>

                {/* Cantidad */}
                <p className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">Cantidad:</span>
                    <span className="text-gray-900">{info.cantidad}</span>
                </p>

                {/* Descripción - Separada del resto para más espacio */}
                <div className="pt-2">
                    <p className="font-semibold text-gray-600 mb-1">Descripción:</p>
                    <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {info.descripcion || "Sin descripcion disponible"}
                    </p>
                </div>

                {/* Genero - Usamos flex para poner la insignia al lado */}
                <div className="flex items-center pt-2">
                    <span className="font-semibold text-gray-600 w-24">Género:</span>
                    {/* Insignia de Género */}
                    <GenreBadge nombre={info.genero_nombre}/>
                </div>
            </div>

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar Libro">
                {selectedContent && <ConfirmActionModal
                    title={selectedContent.titulo}
                    onCancel={() => setIsDeleteOpen(false)}
                    onConfirm={() => deleteBookMutation.mutate(selectedContent.id)}
                    isLoading={deleteBookMutation.isPending}
                />}
            </Modal>

        </section>
    )
}

export default BookInfoSection