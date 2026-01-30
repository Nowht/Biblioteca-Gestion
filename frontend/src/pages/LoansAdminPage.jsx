import SectionHero from "../components/ui/SectionHero"
import LoanItem from "../components/features/LoanItem"
import Modal from "../components/common/Modal"
import RenewLoanModal from "../components/modalcontent/RenewLoanModal"

import { useState, useEffect } from "react"

import { useLoans } from "../hooks/useLoans"

function LoansAdminPage() {
  const [searchquery, setSearchQuery] = useState("")
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [loandata, setLoanData] = useState([])
  const [isActive, setIsActive] = useState(true)

  const { data: loansdata, isLoading, isError, error } = useLoans(searchquery, !isActive)

  const renewmodal = (data) => {
    setLoanData({
      id: data.id,
      fecha_devolucion_esperada: data.fecha_devolucion_esperada
    })
    setIsUpdateOpen(true)
  }

  const selectedbutton = "bg-brand-500 text-white"
  const unselectedbutton = "bg-brand-100 text-brand-500"

  return (
    <SectionHero
      title="Administración de Préstamos"
      paragraph="Gestiona los préstamos de la biblioteca."
      createTo="/dashboard/loans/add"
      onSearch={setSearchQuery}
    >

      {isLoading && (<div>Cargando Prestamos...</div>)}
      {isError && (<div>Error: {error.message}</div>)}

      <div className="flex">
        <button
          className={`${isActive ? selectedbutton : unselectedbutton} px-4 py-2 font-bold rounded-tl-xl`}
          onClick={() => setIsActive(true)}
        >
          Activos
        </button>
        <button
          className={`${isActive ? unselectedbutton : selectedbutton} px-4 py-2 font-bold rounded-tr-xl`}
          onClick={() => setIsActive(false)}
        >
          Devueltos
        </button>
      </div>

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