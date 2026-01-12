import Button from "../ui/Button"

import { useDeleteBook } from "../../hooks/useBooks"

function ConfirmActionModal({content, onCancel, book=false, user=false, loan=false}) {

  const deleteBookMutation = useDeleteBook()

  const deleteAction = (id) => {
    if(book){
      deleteBookMutation.mutate(id)
    }
  }

  return (
    <div className="flex flex-col space-y-8">
        <div className="text-center">
            <h3>Estas seguro de eliminar a <strong>{content.titulo}</strong></h3>
        </div>
        <div className="flex justify-center-safe gap-4">
            <Button onFunc={onCancel} variant="danger">Cancelar</Button>
            <Button onFunc={() => deleteAction(content.id)} variant="primary">Eliminar</Button>
        </div>
    </div>
  )
}

export default ConfirmActionModal