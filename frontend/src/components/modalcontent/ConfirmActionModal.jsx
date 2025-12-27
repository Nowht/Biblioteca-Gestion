import Button from "../ui/Button"

function ConfirmActionModal({content, onCancel}) {
  return (
    <div className="flex flex-col space-y-8">
        <div className="text-center">
            <h3>Estas seguro de eliminar a {content}</h3>
        </div>
        <div className="flex justify-center-safe gap-4">
            <Button onFunc={onCancel} variant="danger">Cancelar</Button>
            <Button type="submit" variant="primary">Eliminar</Button>
        </div>
    </div>
  )
}

export default ConfirmActionModal