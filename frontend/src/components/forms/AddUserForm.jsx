import FormField from "./FormField"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"

import { User } from "lucide-react"

function AddUserForm() {
    return (
        <form action="" className="border border-gray-100 bg-white rounded-xl flex flex-col items-center p-8 shadow-sm">
            <div className="h-32 w-32 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                <User size={100} />
            </div>
            <div className="flex flex-col items-center space-y-3">
                <FormField label="Nombre" name="user" type="text" required />
                <FormField label="Contraseña" name="password" type="password" required />
                <FormField label="Rol" name="role" options={[{ value: "admin", label: "Administrador" }, { value: "user", label: "Usuario" }]} />
            </div>

            <div className="flex justify-center gap-3 mt-6">
                <ButtonLink to="/dashboard/users" variant="outline" className="text-md">Cancelar</ButtonLink>
                <Button type="submit" variant="primary" className="text-md">Crear Usuario</Button>
            </div>
        </form>
    )
}

export default AddUserForm