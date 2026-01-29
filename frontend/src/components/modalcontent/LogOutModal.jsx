import { LogOut } from "lucide-react"
import Button from "../ui/Button"

function LogOutModal({ onCancel, onConfirmLogout }) {

    const handleLogout = () => {
        onConfirmLogout()
        onCancel()
    }

    return (
        <div className="p-6 text-center">
            {/* Icono de advertencia */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <LogOut className="h-6 w-6 text-red-600" />
            </div>

            {/* Texto Informativo */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">
                ¿Cerrar sesión ahora?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
                Estás a punto de salir del panel de administración. Asegúrate de haber guardado todos tus cambios en libros o préstamos antes de continuar.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onFunc={onCancel} variant="danger" >
                    Cancelar
                </Button>
                <Button onFunc={handleLogout} variant="primary">
                    Sí, cerrar sesión
                </Button>
            </div>
        </div>
    )
}

export default LogOutModal