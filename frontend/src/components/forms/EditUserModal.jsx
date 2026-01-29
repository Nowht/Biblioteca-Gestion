import { User } from "lucide-react"

import FormField from "./FormField"
import Button from "../ui/Button"
import { useEffect } from "react"

import { useUser, useUpdateUser } from "../../hooks/useUsers"

import { useForm } from "react-hook-form"

function EditUserModal({ userdata, onClickClose }) {

    const { id } = userdata
    const { data, isLoading } = useUser(id)
    const { register, reset, handleSubmit, formState: { isSubmitting, errors } } = useForm()

    const { mutate } = useUpdateUser()

    useEffect(() => {
        if (data) {
            // se autocompletara el formulario si los datos estan disponibles (modal abierto)
            // evita que se autocomplete informacion sensible
            const formValues = {
                username: data.username ?? "",
                is_staff: data.is_staff ?? false,
            }
            reset(formValues)
        }
    }, [data, reset])

    const onSubmit = (data) => {
        const finaldata = ({
            ...data,
            is_staff: data.is_staff === "true",
        })

        if (!finaldata.password || finaldata.password.trim() === "") {
            delete finaldata.password
        }

        mutate({ id, data: finaldata })
        onClickClose()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8">
            <div className="flex justify-center items-center gap-6">
                <div className="h-16 w-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xl font-bold">
                    <User size={50} />
                </div>
                <div className="grid gap-4">
                    <FormField
                        name="username"
                        label="Usuario"
                        type="text"
                        {...register("username", { required: "Este campo es requerido" })}
                        error={errors.username}
                    />
                    <FormField
                        name="is_staff"
                        label="Rol"
                        options={[{ value: true, label: "Administrador" }, { value: false, label: "Usuario" }]}
                        {...register("is_staff")}
                    />
                    <FormField name="password" label="Contraseña" type="password" {...register("password")} />
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <Button type="submit" variant="primary">Actualizar Datos</Button>
            </div>
        </form>
    )
}

export default EditUserModal