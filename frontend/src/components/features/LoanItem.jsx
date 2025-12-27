function LoanItem({ 
    title = "Don Quijote de la mancha",
    user,
    startDate,
    endDate,
    status = "active", // "active" o "history"
    isAdmin = true,
    onAction1, // Por ejemplo: Renovar o Editar
    onAction2  // Por ejemplo: Devolver o Eliminar
}) {

    const isHistory = status === "history";
    const borderColors = isHistory ? "border-gray-400" : "border-green-500";
    const opacityStyle = isHistory ? "opacity-75 grayscale-[0.5]" : "opacity-100";


    return (
        <div className={`bg-white border-l-4 ${borderColors} ${opacityStyle} shadow-sm rounded-r-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-all`}>
            <div className="flex gap-4 items-center w-full">
                <div className="w-12 h-16 bg-gray-200 rounded shrink-0 flex items-center justify-center text-gray-400">
                    <span className="text-[10px]">Libro</span>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{title}</h3>
                    {isAdmin &&(
                        <p className="text-sm text-gray-500">Usuario: {user}</p>
                    )}
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs md:text-sm">
                        <span className="flex flex-col">
                            <strong className="text-gray-400 uppercase text-[10px]">Salida</strong>
                            {startDate}
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-gray-400 uppercase text-[10px]">Entrega</strong>
                            {endDate}
                        </span>
                    </div>
                </div>
            </div>

            {/* Renderizado condicional de botones: Solo si es admin y no es historial */}
            {isAdmin && !isHistory && (
                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={onAction1}
                        className="flex-1 md:flex-none bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                    >
                        Renovar
                    </button>
                    <button
                        onClick={onAction2}
                        className="flex-1 md:flex-none bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                        Devolver
                    </button>
                </div>
            )}

            {/* Si es historial, podemos mostrar un badge en lugar de botones */}
            {isHistory && (
                <span className="text-xs font-bold uppercase text-gray-400 border border-gray-300 px-3 py-1 rounded-full">
                    Completado
                </span>
            )}
        </div>
    )
}

export default LoanItem