import FormField from "./FormField"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"

import { useForm } from "react-hook-form"

import { User } from "lucide-react"

import { useCreateUser } from "../../hooks/useUsers"
import { toast } from "react-hot-toast"

function AddUserForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

    const { mutate, isLoading } = useCreateUser()

    const onSubmit = (data) => {

        const finaldata = {
            ...data,
            is_staff: data.is_staff === "true"
        }

        mutate(finaldata, {
            onSuccess: () => {
                toast.success('¡Usuario creado correctamente!');
                reset()
            },
            onError: (error) => {
                const serverError = error.response?.data;
                const message = serverError?.username?.[0] || serverError?.detail || "Intente de nuevo";

                toast.error(message);
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-100 bg-white rounded-xl flex flex-col items-center p-8 shadow-sm">

            <div className="h-32 w-32 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xl font-bold">
                <User size={100} />
            </div>
            <div className="flex flex-col items-center space-y-3">
                <FormField label="Nombre" name="username" type="text" error={errors.username} {...register("username", { required: "Este campo es obligatorio" })} />
                <FormField label="Contraseña" name="password" type="password" error={errors.password} {...register("password", { required: true, minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" } })} />
                <FormField label="Rol" name="is_staff" options={[{ value: true, label: "Administrador" }, { value: false, label: "Usuario" }]} error={errors.is_staff} {...register("is_staff", { required: "Este campo es obligatorio" })} />
            </div>

            <div className="flex justify-center gap-3 mt-6">
                <ButtonLink to="/dashboard/users" variant="secondary" className="text-md">Cancelar</ButtonLink>
                <Button type="submit" variant="primary" className="text-md" disabled={isSubmitting}>
                    {isLoading ? "Creando..." : "Crear Usuario"}
                </Button>
            </div>
        </form>
    )
}

export default AddUserForm