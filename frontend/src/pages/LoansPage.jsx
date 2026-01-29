import SectionHero from "../components/ui/SectionHero"

import ListLayout from "../components/features/ListLayout"
import LoanItem from "../components/features/LoanItem"

import { History, Clock } from "lucide-react"

import { useLoans } from "../hooks/useLoans"
import { useMemo } from "react"

import { useState } from "react"

function LoansPage() {

    const [ searchquery, setSearchQuery ] = useState("")

    const { data, isLoading } = useLoans(searchquery)

    const { activos, entregados } = useMemo(() => {
        if (!Array.isArray(data)) return { activos: [], entregados: [] }

        return {
            activos: data.filter(p => !p.devuelto),
            entregados: data.filter(p => p.devuelto)
        }
    }, [data])


    if (isLoading) return <div className="text-2xl text-center">Cargando...</div>

    return (
        <div className="px-8 py-4">
            <SectionHero
                title="Mi Actividad"
                paragraph="Consulta tus libros actuales y el historial de tus lecturas."
                onSearch={setSearchQuery}
                >
                <div className="space-y-8">
                    {/* SECCIÓN ACTIVOS */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-orange-500" /> Préstamos Activos
                        </h2>
                        <div className="grid gap-4">
                            <ListLayout>
                                {activos.length > 0 ? (
                                    activos.map((l) => (
                                        <LoanItem loanInfo={l} key={l.id} />
                                    ))) : (
                                    <div className="p-4 bg-brand-50 text-brand-700 rounded-lg">No tienes préstamos activos en este momento.</div>
                                )}
                            </ListLayout>
                        </div>
                    </div>

                    {/* SECCIÓN HISTORIAL */}
                    <div className="pt-6 border-t border-gray-200">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <History size={20} className="text-brand-500" /> Historial Completo
                        </h2>
                        <div className="grid gap-3">
                            <ListLayout>
                                {entregados.length > 0 ? (
                                    entregados.map((l) => (
                                        <LoanItem loanInfo={l} key={l.id} />
                                    ))
                                ) : (
                                    <div className="p-4 bg-brand-50 text-brand-700 rounded-lg">No tienes historial de prestamos.</div>
                                )}
                            </ListLayout>
                        </div>
                    </div>
                </div>
            </SectionHero>
        </div>
    )
}

export default LoansPage