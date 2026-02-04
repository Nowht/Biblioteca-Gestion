import { Loader2 } from "lucide-react"

function LoadingMessage({ message = "Cargando datos..." }) {
    return (
        <div className="min-h-[calc(100vh-100px)] flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center p-10 space-y-4">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="text-gray-600 font-medium">{message}</p>
            </div>
        </div>
    )
}

export default LoadingMessage