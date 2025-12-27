import { User } from "lucide-react"

import FormField from "./FormField"
import Button from "../ui/Button"
import ButtonLink from "../ui/ButtonLink"

function EditUserModal({ user, role }) {
    return (
        <div className="flex flex-col space-y-8">
            <div className="flex justify-center items-center gap-6">
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                    <User size={50} />
                </div>
                <div className="grid gap-4">
                    <FormField label="Usuario" type="text" value={user} />
                    <FormField label="Rol" value={role} options={[{value:"admin", label:"Administrador"}, {value:"user", label:"Usuario"}]}/>
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <Button type="submit" variant="primary">Actualizar Datos</Button>
            </div>
        </div>
    )
}

export default EditUserModal