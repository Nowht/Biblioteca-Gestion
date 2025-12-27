import { LogOut } from "lucide-react"

function LogOutModal({onCancel}) {
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
                <button
                    onClick={onCancel} // Función para cerrar el modal sin hacer nada
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors order-2 sm:order-1"
                >
                    Cancelar
                </button>
                <button
                    //onClick={handleLogout} // Función real de cierre de sesión
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 shadow-md shadow-red-200 transition-colors order-1 sm:order-2"
                >
                    Sí, cerrar sesión
                </button>
            </div>
        </div>
    )
}

export default LogOutModal