import SectionHero from "../components/ui/SectionHero"
import LoanItem from "../components/features/LoanItem"
import Modal from "../components/common/Modal"
import RenewLoanModal from "../components/modalcontent/RenewLoanModal"

import { useState } from "react"

import { useLoans } from "../hooks/useLoans"

function LoansAdminPage() {

  const { data: loansdata, isLoading, isError, error } = useLoans()

  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [loandata, setLoanData] = useState([])

  const renewmodal = (data) => {
    setLoanData({
      id: data.id, 
      fecha_devolucion_esperada: data.fecha_devolucion_esperada
    })
    setIsUpdateOpen(true)
  }

  return (
    <SectionHero title="Administración de Préstamos" paragraph="Gestiona los préstamos de la biblioteca." createTo="/dashboard/loans/add">

      {isLoading && (<div>Cargando Prestamos...</div>)}
      {isError && (<div>Error: {error.message}</div>)}

      <div className="h-full overflow-y-auto pr-2">
        {loansdata?.map((info) => (
          <LoanItem loanInfo={info} key={info.id} renewmodal={() => renewmodal(info)} />
        ))}
      </div>

      <Modal isOpen={isUpdateOpen} >
        {loandata && <RenewLoanModal onCancel={() => setIsUpdateOpen(false)} dataofloan={loandata} />}
      </Modal>

    </SectionHero>
  )
}

export default LoansAdminPage