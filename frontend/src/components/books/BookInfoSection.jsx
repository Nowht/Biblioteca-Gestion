import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"
import BookStatusBadge from "../books/BookStatusBadge"

import Modal from "../common/Modal";
import ConfirmActionModal from "../modalcontent/ConfirmActionModal";

import { Pencil, Trash2 } from "lucide-react";

import { useState } from "react";

function BookInfoSection({ info }) {

    const [selectedContent, setSelectedContent] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openDelete = (user) => {
        setSelectedContent(user);
        setIsDeleteOpen(true)
    }

    const esReservable = info.estado?.toLowerCase() === "disponible";
    const textoBoton = esReservable ? "Reservar Libro" : "No disponible para reserva";

    return (
        <section className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-100">
            {/* Título y disponibilidad - Usamos flex para poner la insignia al lado */}
            <header className="mb-4 pb-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-xl md:text-3xl font-extrabold text-gray-900">
                        {info.titulo}
                    </h1>
                    {/* La insignia se muestra junto al título */}
                    <BookStatusBadge status={info.estado} />
                </div>

                <div className="flex gap-4">
                    <Button variant="deletenobg" onFunc={() => openDelete("Titulo")}>
                        <Trash2 />
                    </Button>
                    <ButtonLink variant="edit" to="/dashboard/books/edit">
                        <Pencil />
                    </ButtonLink>
                </div>
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

                {/* Descripción - Separada del resto para más espacio */}
                <div className="pt-2">
                    <p className="font-semibold text-gray-600 mb-1">Descripción:</p>
                    <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {info.descripcion || "Sin descripcion disponible" }
                    </p>
                </div>

                {/* Genero - Usamos flex para poner la insignia al lado */}
                <p className="flex items-center pt-2">
                    <span className="font-semibold text-gray-600 w-24">Género:</span>
                    {/* Insignia de Género */}
                    <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full shadow-md md:hover:bg-indigo-600 transition">
                        {info.genero|| "General"}
                    </span>
                </p>
            </div>

            {/* Pie de página con botón de acción */}
            <footer className="mt-8 pt-4 border-t border-gray-200">
                {!esReservable && (
                    <p className="text-xs text-red-500 mt-2 italic">
                        * Este libro se encuentra actualmente en {info.estado}.
                    </p>
                )}
                <button
                    className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg md:hover:bg-blue-700 transition duration-300 transform md:hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    disabled={!textoBoton} // Deshabilita si no está disponible
                >
                    {textoBoton}
                </button>
            </footer>

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar Libro">
                <ConfirmActionModal content={selectedContent} onCancel={() => setIsDeleteOpen(false)} />
            </Modal>

        </section>
    )
}

export default BookInfoSection