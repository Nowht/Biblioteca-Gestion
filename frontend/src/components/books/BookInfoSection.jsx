import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"

import Modal from "../common/Modal";
import ConfirmActionModal from "../modalcontent/ConfirmActionModal";

import { Pencil, Trash2 } from "lucide-react";

import { useState } from "react";

function BookInfoSection() {

    const [selectedContent, setSelectedContent] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const openDelete = (user) => {
        setSelectedContent(user);
        setIsDeleteOpen(true)
    }

    const InsigniaDisponible = (
        <span className="ml-2 px-3 py-1 bg-green-600 text-green-50 text-xs font-bold rounded-full border-2 border-green-100/50 shadow-sm">
            Disponible
        </span>
    );

    const InsigniaNoDisponible = (
        <span className="ml-2 px-3 py-1 bg-red-600 text-red-50 text-xs font-bold rounded-full border-2 border-red-100/50 shadow-sm">
            No Disponible
        </span>
    );

    // Simulación de los datos del libro
    const esDisponible = true; // Cambia a false para probar 'No Disponible'
    const generoLibro = "Ficción Histórica";

    return (
        <section className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-100">
            {/* Título y disponibilidad - Usamos flex para poner la insignia al lado */}
            <header className="mb-4 pb-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Titulo del Libro
                    </h1>
                    {/* La insignia se muestra junto al título */}
                    {esDisponible ? InsigniaDisponible : InsigniaNoDisponible}
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
                    <span className="text-gray-900">[Nombre del Autor]</span>
                </p>

                {/* ISBN */}
                <p className="flex items-center">
                    <span className="font-semibold text-gray-600 w-24">ISBN:</span>
                    <span className="text-gray-900">[Número ISBN]</span>
                </p>

                {/* Descripción - Separada del resto para más espacio */}
                <div className="pt-2">
                    <p className="font-semibold text-gray-600 mb-1">Descripción:</p>
                    <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                        [Descripción del libro - Un texto un poco más largo que se beneficia de un bloque dedicado. Aquí puedes justificar el texto o limitar las líneas si es necesario.]
                    </p>
                </div>

                {/* Genero - Usamos flex para poner la insignia al lado */}
                <p className="flex items-center pt-2">
                    <span className="font-semibold text-gray-600 w-24">Género:</span>
                    {/* Insignia de Género */}
                    <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-semibold rounded-full shadow-md md:hover:bg-indigo-600 transition">
                        {generoLibro}
                    </span>
                </p>
            </div>

            {/* Pie de página con botón de acción */}
            <footer className="mt-8 pt-4 border-t border-gray-200">
                <button
                    className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg md:hover:bg-blue-700 transition duration-300 transform md:hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    disabled={!esDisponible} // Deshabilita si no está disponible
                >
                    {esDisponible ? "Reservar Libro" : "No Disponible para Reserva"}
                </button>
            </footer>

            <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Eliminar Libro">
                <ConfirmActionModal content={selectedContent} onCancel={() => setIsDeleteOpen(false)} />
            </Modal>

        </section>
    )
}

export default BookInfoSection