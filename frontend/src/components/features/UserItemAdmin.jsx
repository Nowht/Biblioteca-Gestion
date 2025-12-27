import Button from "../ui/Button"

import { Pencil, Trash2 } from "lucide-react"

function UserItemAdmin({ name = "usuario", role = "user/admin", date = "fecha", onViewDetail, onEdit, onDelete }) {
    return (
        <li className="flex items-center justify-between gap-4 p-4 md:hover:bg-gray-50">
            <input type="checkbox" className="w-4 h-4" />
            <button type="button" onClick={onViewDetail} className="flex-1 flex items-center justify-between text-left">
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-gray-900 group-md:hover:text-blue-600 transition-colors">{name}</span>
                    <span className="text-xs text-gray-500 font-medium px-2 py-0.5 bg-gray-100 rounded-full w-fit">{role}</span>
                </div>
            </button>
            <div className="flex items-center gap-1">
                <Button variant="edit" onFunc={onEdit}>
                    <Pencil size={20} />
                </Button>
                <Button variant="delete" onFunc={onDelete}>
                    <Trash2 size={20} />
                </Button>
            </div>
        </li>
    )
}

export default UserItemAdmin