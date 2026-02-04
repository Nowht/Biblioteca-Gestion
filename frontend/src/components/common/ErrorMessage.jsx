import { AlertCircle, RefreshCcw } from "lucide-react"

export const getErrorMessage = (error) => {

    if (!error) return null

    // Error de Conexión (Backend apagado)
    if (error?.code === "ERR_NETWORK" || !error.response) {
        return "No se pudo conectar con el servidor.";
    }

    // Error de Respuesta (El backend sí respondió, pero con un error)
    const status = error.response?.status;
    const detail = error.response?.data?.detail || error.response?.data?.message;

    if (status === 404) return "Lo sentimos, el recurso no fue encontrado.";
    if (status === 403) return "No tienes permisos para ver esto.";
    if (status === 500) return "El servidor tuvo un problema interno.";

    // Mensaje por defecto si nada de lo anterior coincide
    return detail || "Ocurrió un error inesperado al cargar los datos.";
}

function ErrorMessage({ message, retryFn }) {

    return (
        <div className="min-h-[calc(100vh-100px)] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center p-10">
                <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
                <h3 className="text-lg font-bold text-red-800">Hubo un problema</h3>
                <p className="text-red-600 text-center mb-4">{message}</p>

                {retryFn && (
                    <button
                        onClick={retryFn}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        <RefreshCcw className="w-4 h-4" /> Reintentar
                    </button>
                )}
            </div>
        </div>
    )
}

export default ErrorMessage