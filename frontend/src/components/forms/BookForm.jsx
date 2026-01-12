import FormField from "./FormField"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"
import Modal from "../common/Modal"
import AddGenreForm from "./AddGenreForm"

import { useState, useEffect } from "react"

import { useForm } from "react-hook-form"

import { useParams } from "react-router-dom"

import { useCreateBook, useUpdateBook, useBook } from "../../hooks/useBooks"

import { Plus } from "lucide-react"

import { useGenres } from "../../hooks/useGenres"

function BookForm() {

    const { id } = useParams()
    const isEditMode = !!id

    const { data: libro, isLoading: cargandoLibro } = useBook(id)

    const createMutation = useCreateBook()
    const updateMutation = useUpdateBook()

    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm()

    useEffect(() => {
        if (isEditMode && libro) {
            reset(libro)
        }
    }, [isEditMode, libro, reset])


    const { data: generos, isLoading: cargando } = useGenres()

    const [addgenremodal, setAddGenreModal] = useState(false)

    const opcionesGeneros = generos ? generos.map((g) => ({
        value: g.id,
        label: g.nombre
    })) : []

    const onSubmit = (data) => {
        if (isEditMode) {
            updateMutation.mutate({ id, data })
        } else {
            createMutation.mutate(data)
        }
    }

    if (isEditMode && cargandoLibro) return <p>Cargando datos...</p>;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="border bg-white border-gray-300 rounded-xl grid grid-cols-1 lg:grid-cols-3 shadow-sm">
                <div className="lg:col-span-2 space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Título" name="title" type="text" {...register("titulo", { required: "Este campo es requerido" })} error={errors.titulo} />
                        <FormField label="Autor" name="author" type="text" {...register("autor", { required: "Este campo es requerido" })} error={errors.autor} />
                        <FormField label="ISBN" name="isbn" type="text" {...register("isbn", { required: "Este campo es requerido" })} error={errors.isbn} />
                        <FormField label="Editorial" name="publisher" type="text" {...register("editorial", { required: "Este campo es requerido" })} error={errors.editorial} />
                        <FormField label="Fecha de Publicación" name="publicationDate" type="date" {...register("fecha_publicacion", { required: "Este campo es requerido" })} error={errors.fecha_publicacion} />
                        <FormField label="Cantidad" name="quantity" type="number" {...register("cantidad", { required: "Este campo es requerido" })} error={errors.cantidad} />
                        <div className="md:col-span-2 flex items-end gap-8">
                            <FormField
                                label="Genero"
                                name="genre"
                                options={opcionesGeneros}
                                {...register("genero", { required: "Este campo es requerido" })}
                            />
                            <Button onFunc={() => setAddGenreModal(true)} variant="green" className="gap-2">
                                Agregar <Plus size={24} />
                            </Button>
                        </div>
                        <div className="md:col-span-2 flex justify-center">
                            <FormField
                                label="Estado"
                                name="status"
                                options={[
                                    { value: "disponible", label: "Disponible" },
                                    { value: "prestado", label: "Prestado" },
                                    { value: "mantenimiento", label: "Mantenimiento" },
                                ]}
                                {...register("estado")} />
                        </div>
                        <div className="md:col-span-2">
                            <FormField label="Descripción" name="description" type="textarea" {...register("descripcion")} />
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
                    <Button type="submit" variant="primary">{isEditMode ? "Guardar Cambios" : "Crear Libro"}</Button>
                </div>
            </form>
            <Modal isOpen={addgenremodal} onClose={() => setAddGenreModal(false)} title="Agregar Nuevo Género">
                <AddGenreForm />
            </Modal>
        </>
    )
}

export default BookForm