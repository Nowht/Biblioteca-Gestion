import Button from "../ui/Button"
import { X } from "lucide-react"

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                {title && (
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h3 className="text-xl font-bold">{title}</h3>
                        <Button variant="delete" onFunc={onClose}>
                            <X />
                        </Button>
                    </div>
                )}
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal