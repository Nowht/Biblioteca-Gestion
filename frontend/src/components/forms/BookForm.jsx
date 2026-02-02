import FormField from "./FormField"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"
import Modal from "../common/Modal"
import AddGenreForm from "./AddGenreForm"

import { useState, useEffect } from "react"

import { useForm } from "react-hook-form"

import { useParams } from "react-router-dom"

import { useCreateBook, useUpdateBook, useBook } from "../../hooks/useBooks"

import { Plus, ImagePlus } from "lucide-react"

import { useGenres } from "../../hooks/useGenres"

function BookForm() {

    const { id } = useParams()
    const isEditMode = !!id

    const { data: libro, isLoading: cargandoLibro } = useBook(id)

    const createMutation = useCreateBook()
    const updateMutation = useUpdateBook()

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()

    useEffect(() => {
        if (isEditMode && libro) {
            reset(libro)
            setPreview(libro.portada)
        }
    }, [isEditMode, libro, reset])

    const { data: generos, isLoading: cargando } = useGenres()

    const [addgenremodal, setAddGenreModal] = useState(false)

    const opcionesGeneros = generos ? generos.map((g) => ({
        value: g.id,
        label: g.nombre
    })) : []

    const imgsubida = watch("portada")
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        if (imgsubida && imgsubida?.length > 0 && imgsubida[0] instanceof File) {
            const file = imgsubida[0]
            const url = URL.createObjectURL(file)
            setPreview(url)

            return () => URL.revokeObjectURL(url)
        }
    }, [imgsubida])

    const onSubmit = (data) => {
        if (isEditMode) {
            const finaldata = {
                ...data,
                portada: data.portada[0]
            }
            console.log(finaldata)
            updateMutation.mutate({ id, data: finaldata })
        } else {

            const finaldata = {
                ...data,
                portada: data.portada[0]
            }
            createMutation.mutate(finaldata)
        }
    }

    if (isEditMode && cargandoLibro) return <p>Cargando datos...</p>;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="border bg-white border-gray-300 rounded-xl grid grid-cols-1 lg:grid-cols-3 shadow-sm">
                <div className="lg:col-span-2 space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Título" name="title" type="text" placeholder="Titulo del libro" {...register("titulo", { required: "Este campo es requerido" })} error={errors.titulo} />
                        <FormField label="Autor" name="author" type="text" placeholder="Nombre del autor" {...register("autor", { required: "Este campo es requerido" })} error={errors.autor} />
                        <FormField label="ISBN" name="isbn" type="text" placeholder="Introduzca el isbn" {...register("isbn", { required: "Este campo es requerido" })} error={errors.isbn} />
                        <FormField label="Editorial" name="publisher" type="text" placeholder="Introduzca la editorial" {...register("editorial", { required: "Este campo es requerido" })} error={errors.editorial} />
                        <FormField label="Fecha de Publicación" name="publicationDate" type="date" {...register("fecha_publicacion", { required: "Este campo es requerido" })} error={errors.fecha_publicacion} />
                        <FormField label="Cantidad" name="quantity" type="number" placeholder="Introduzca la cantidad" {...register("cantidad", { required: "Este campo es requerido" })} error={errors.cantidad} />
                        <div className="md:col-span-2 flex items-end gap-8">
                            <FormField
                                label="Genero"
                                name="genre"
                                placeholder="Seleccione un género"
                                options={opcionesGeneros}
                                {...register("genero", { required: "Este campo es requerido" })}
                            />
                            <Button onFunc={() => setAddGenreModal(true)} variant="primary" className="gap-2">
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
                            <FormField label="Descripción" name="description" type="textarea" placeholder="Opcional" {...register("descripcion")} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 flex flex-col items-center justify-center my-2 p-6">
                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-96 cursor-pointer border-dashed border">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-brand-500">
                            <ImagePlus size={20} />
                            <span className="mb-2 text-sm font-semibold">Haz clic para subir</span>
                            <span className="text-xs">PNG, JPG o GIF</span>
                        </div>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            {...register("portada")}
                        />
                        {preview && (
                            <div className="mt-4">
                                <img src={preview} alt="Vista previa" style={{ width: '200px' }} />
                            </div>
                        )}
                        {imgsubida?.length > 0 && <span>Archivo {imgsubida[0]?.name}</span>}
                    </label>

                </div>

                {/* BOTONERA (Ocupa todo el ancho abajo) */}
                <div className="lg:col-span-3 flex justify-center lg:justify-end gap-4 p-6">
                    <ButtonLink to="/dashboard/books" variant="secondary">Cancelar</ButtonLink>
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