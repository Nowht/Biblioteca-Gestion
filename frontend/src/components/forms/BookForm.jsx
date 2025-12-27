import FormField from "./FormField"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"

function AddBookForm() {
    return (
        <form action="" className="border bg-white border-gray-300 rounded-xl grid grid-cols-1 lg:grid-cols-3 shadow-sm">
            <div className="lg:col-span-2 space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Título" name="title" type="text" required />
                    <FormField label="Autor" name="author" type="text" required />
                    <FormField label="ISBN" name="isbn" type="text" required />
                    <FormField label="Editorial" name="publisher" type="text" required />
                    <FormField label="Fecha de Publicación" name="publicationDate" type="date" required />
                    <FormField label="Cantidad" name="quantity" type="number" required />
                    <FormField label="Genero" name="genre" options={[{ value: "fic", label: "Ficcion" }, { value: "no-fic", label: "No Ficcion" }]} />
                    <FormField label="Estado" name="status" type="checkbox" />
                    <div className="md:col-span-2">
                        <FormField label="Descripción" name="description" type="textarea" />
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1 flex items-center justify-center my-2 p-6">
                <div className="flex-1 sticky top-6 border-2 border-dashed border-gray-300 rounded-lg p-4 h-96 flex items-center justify-center text-gray-500">
                    {/* Aquí irá tu lógica de previsualización de imagen */}
                    Espacio para Portada
                </div>
            </div>

            {/* BOTONERA (Ocupa todo el ancho abajo) */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end gap-4 p-6">
                <ButtonLink to="/dashboard/books" variant="outline">Cancelar</ButtonLink>
                <Button type="submit" variant="primary">Guardar Libro</Button>
            </div>
        </form>
    )
}

export default AddBookForm