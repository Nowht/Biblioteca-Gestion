import { useForm } from "react-hook-form"

import FormField from "./FormField"
import Button from "../ui/Button"

import { useCreateGenre } from "../../hooks/useGenres"

import { toast } from "react-hot-toast"

function AddGenreForm() {

    const { register, handleSubmit, reset} = useForm()
    const { mutate, isLoading, isSuccess } = useCreateGenre()

    const onSubmit = (data) => {
        mutate(data, {
            onSucces: () => {
                toast.success("Genero creado con exito")
                reset()
            },
            onError: () => {
                toast.error("Error al crear el genero")
            } 
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Nombre del Género" name="nombre" type="text" {...register("nombre", { required: "Este campo es requerido" })} />
            <div className="flex justify-end mt-6">
                <Button type="submit" variant={isSuccess? "green":"primary"} disabled={isSuccess}>{isSuccess? "Creado" : "Agregar Genero"}</Button>
            </div>
        </form>
    )
}

export default AddGenreForm