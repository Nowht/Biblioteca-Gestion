import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import { useUpdateLoan } from "../../hooks/useLoans";

function LoanItem({
    loanInfo,
    renewmodal,
}) {

    const { user } = useContext(AuthContext)

    const fechaFin = new Date(loanInfo.fecha_devolucion_esperada)
    const fechaHoy = new Date()

    const aTiempo = fechaFin < fechaHoy

    const isHistory = loanInfo.devuelto === true;
    const borderColors = isHistory ? "border-gray-400" : (aTiempo ? "border-red-500" : "border-green-500");
    const opacityStyle = isHistory ? "opacity-75 grayscale-[0.5]" : "opacity-100";

    const { mutate: devolver } = useUpdateLoan()

    const handleReturn = (info) => {

        const hoy = new Date()
        const fechaFormateada = hoy.toISOString().split('T')[0]

        const finalData = {
            ...info,
            fecha_entregado_real: fechaFormateada,
            devuelto: true
        }

        devolver({
            id: finalData.id,
            data: finalData
        })
    }

    return (
        <div className={`bg-white border-l-4 ${borderColors} ${opacityStyle} shadow-sm rounded-r-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-all`}>
            <div className="flex gap-4 items-center w-full">
                <div className="w-12 h-16 bg-gray-200 rounded shrink-0 flex items-center justify-center text-gray-400">
                    <span className="text-[10px]">Libro</span>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{loanInfo.libro_detalle}</h3>
                    {user?.isStaff && (
                        <p className="text-sm text-gray-500">Usuario: {loanInfo.usuario_nombre}</p>
                    )}
                    {aTiempo && <span className="bg-red-500 text-white py-1 px-3 rounded-full text-xs font-bold" >Devolucion Tardía</span>}
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs md:text-sm">
                        <span className="flex flex-col">
                            <strong className="text-gray-400 uppercase text-xs">Salida</strong>
                            {loanInfo.fecha_inicio.split('T')[0]}
                        </span>
                        <span className="flex flex-col">
                            <strong className="text-gray-400 uppercase text-xs">Entrega</strong>
                            {loanInfo.fecha_devolucion_esperada}
                        </span>
                    </div>
                </div>
            </div>

            {/* Renderizado condicional de botones: Solo si es admin y no es historial */}
            {user?.isStaff && !loanInfo.devuelto && (
                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={renewmodal}
                        className="flex-1 md:flex-none bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                    >
                        Renovar
                    </button>
                    <button
                        onClick={() => handleReturn(loanInfo)}
                        className="flex-1 md:flex-none bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                        Devolver
                    </button>
                </div>
            )}

            {/* Si es historial, podemos mostrar un badge en lugar de botones */}
            {loanInfo.devuelto && (
                <span className="text-xs font-bold uppercase text-gray-400 border border-gray-300 px-3 py-1 rounded-full">
                    Completado
                </span>
            )}
        </div>
    )
}

export default LoanItem