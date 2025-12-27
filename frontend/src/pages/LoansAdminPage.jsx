import SectionHero from "../components/ui/SectionHero"
import LoanItem from "../components/features/LoanItem"

function LoansAdminPage() {
  return (
    <SectionHero title="Administración de Préstamos" paragraph="Gestiona los préstamos de la biblioteca." createTo="/dashboard/loans/add">
      <div className="h-full overflow-y-auto pr-2">
        <LoanItem />
      </div>
    </SectionHero>
  )
}

export default LoansAdminPage