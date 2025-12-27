import SectionHero from "../components/ui/SectionHero"

import ListLayout from "../components/features/ListLayout"
import LoanItem from "../components/features/LoanItem"

import { History, Clock } from "lucide-react"

function LoansPage() {
    return (
        <div className="px-8 py-4">
            <SectionHero
                title="Mi Actividad"
                paragraph="Consulta tus libros actuales y el historial de tus lecturas.">
                <div className="space-y-8">
                    {/* SECCIÓN ACTIVOS */}
                    <div>
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-orange-500" /> Préstamos Activos
                        </h2>
                        <div className="grid gap-4">
                            <ListLayout>
                                <LoanItem/>
                            </ListLayout>
                        </div>
                    </div>

                    {/* SECCIÓN HISTORIAL */}
                    <div className="pt-6 border-t border-gray-200">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <History size={20} className="text-blue-500" /> Historial Completo
                        </h2>
                        <div className="grid gap-3">
                            {/* Aquí mapeas los préstamos ya finalizados */}
                        </div>
                    </div>
                </div>
            </SectionHero>
        </div>
    )
}

export default LoansPage