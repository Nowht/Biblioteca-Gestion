import { User } from "lucide-react"

import FormField from "./FormField"
import Button from "../ui/Button"
import ButtonLink from "../ui/ButtonLink"
import { useState } from "react"

function EditUserModal({ userdata }) {

    const [formdata, setFormData] = useState({
        username: userdata?.username || "",
        is_staff: userdata?.is_staff || false,
        password: "",
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target

        const finalValue = name === "is_staff" ? (value === "admin") : value

        setFormData({
            ...formdata,
            [name]: finalValue
        })
    }

    return (
        <div className="flex flex-col space-y-8">
            <div className="flex justify-center items-center gap-6">
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                    <User size={50} />
                </div>
                <div className="grid gap-4">
                    <FormField name="username" label="Usuario" type="text" value={formdata.username} onChange={handleChange} />
                    <FormField name="is_staff" label="Rol" value={formdata.is_staff ? "admin" : "user"} options={[{ value: "admin", label: "Administrador" }, { value: "user", label: "Usuario" }]} onChange={handleChange} />
                    <FormField name="password" label="Contraseña" type="password" value={formdata.password} onChange={handleChange} />
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <Button type="button" variant="primary">Actualizar Datos</Button>
            </div>
        </div>
    )
}

export default EditUserModal