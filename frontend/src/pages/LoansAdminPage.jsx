import SectionHero from "../components/ui/SectionHero"
import LoanItem from "../components/features/LoanItem"

import { useLoans } from "../hooks/useLoans"

function LoansAdminPage() {

  const { data:loansdata, isLoading, isError, error } = useLoans()

  return (
    <SectionHero title="Administración de Préstamos" paragraph="Gestiona los préstamos de la biblioteca." createTo="/dashboard/loans/add">

    { isLoading &&(<div>Cargando Prestamos...</div>) }
    { isError && (<div>Error: {error.message}</div>)}

      <div className="h-full overflow-y-auto pr-2">
        { loansdata?.map((info) => (
          <LoanItem loanInfo={info} key={info.id}/>
        )) }
      </div>
    </SectionHero>
  )
}

export default LoansAdminPage