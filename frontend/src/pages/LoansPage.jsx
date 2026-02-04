import SectionHero from "../components/ui/SectionHero"
import ListLayout from "../components/features/ListLayout"
import LoanItem from "../components/features/LoanItem"
import LoadingMessage from "../components/common/LoadingMessage"
import ErrorMessage, {getErrorMessage} from "../components/common/ErrorMessage"

import { History, Clock } from "lucide-react"

import { useLoans } from "../hooks/useLoans"

import { useState } from "react"

function LoansPage() {

    const [searchquery, setSearchQuery] = useState("")
    const [isActive, setIsActive] = useState(true)

    const { data, isLoading, isError, error, refetch } = useLoans(searchquery, !isActive)

    const selectedbutton = "bg-brand-500 text-white"
    const unselectedbutton = "bg-brand-100 text-brand-500"

    if (isLoading) return <LoadingMessage message="Cargando Prestamos..." />
    if(isError) return <ErrorMessage message={getErrorMessage(error)} retryFn={refetch} />

    return (
        <div className="px-8 py-4">
            <SectionHero
                title="Mi Actividad"
                paragraph="Consulta tus libros actuales y el historial de tus lecturas."
                onSearch={setSearchQuery}
            >
                <div className="">
                    <div className="flex">
                        <button
                            className={`${isActive ? selectedbutton : unselectedbutton} px-4 py-2 font-bold rounded-tl-xl flex items-center gap-2`}
                            onClick={() => setIsActive(true)}
                        >
                            <Clock size={20} /> Préstamos Activos
                        </button>
                        <button
                            className={`${isActive ? unselectedbutton : selectedbutton} px-4 py-2 font-bold rounded-tr-xl flex items-center gap-2`}
                            onClick={() => setIsActive(false)}
                        >
                            <History size={20} /> Historial Completo
                        </button>
                    </div>
                    <div>
                        <div className="grid gap-4">
                            <ListLayout>
                                {data.length > 0 ? (
                                    data.map((l) => (
                                        <LoanItem loanInfo={l} key={l.id} />
                                    ))) : (
                                    <div className="p-4 bg-brand-50 text-brand-700 rounded-lg">No tienes préstamos en este momento.</div>
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