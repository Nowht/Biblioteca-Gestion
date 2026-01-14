import Button from "../ui/Button"

function ConfirmActionModal({title, onConfirm, onCancel, isLoading}) {
  
  const handleConfirmClick = () => {
    onConfirm()
    onCancel()
  }

  return (
    <div className="flex flex-col space-y-8">
        <div className="text-center">
            <h3>Estas seguro de eliminar a <strong>{title}</strong></h3>
        </div>
        <div className="flex justify-center-safe gap-4">
            <Button onFunc={onCancel} variant="danger">Cancelar</Button>
            <Button onFunc={handleConfirmClick} disabled={isLoading} variant="primary">
              {isLoading ? "Eliminando..." : "Confirmar"}
              </Button>
        </div>
    </div>
  )
}

export default ConfirmActionModal