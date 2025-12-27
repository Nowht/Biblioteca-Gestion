import FormField from "./FormField"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"

function LoanForm() {
    return (
        /* Estructura lógica del formulario */
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            {/* SECCIÓN 1: ¿Quién y Qué? */}
            <div className="md:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Información del Préstamo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Aquí iría tu componente de búsqueda de usuario */}
                    <FormField label="Buscar Usuario (DNI o Nombre)" name="userId" type="search" />

                    {/* Aquí iría tu componente de búsqueda de libro */}
                    <FormField label="Buscar Libro (Título o Código)" name="bookId" type="search" />
                </div>
            </div>

            {/* SECCIÓN 2: Tiempos */}
            <div className="space-y-2">
                <FormField label="Fecha de Inicio" name="startDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
                <FormField label="Fecha de Devolución" name="endDate" type="date" />
            </div>

            {/* SECCIÓN 3: Detalles extras */}
            <div className="md:col-span-2">
                <FormField label="Notas adicionales" name="notes" type="textarea" placeholder="Ej. El libro tiene la portada un poco desgastada..." />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <ButtonLink to="/dashboard/loans" variant="outline">Cancelar</ButtonLink>
                <Button variant="primary">Confirmar Préstamo</Button>
            </div>
        </form>
    )
}

export default LoanForm