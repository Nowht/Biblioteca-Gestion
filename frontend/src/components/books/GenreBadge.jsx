import { X } from "lucide-react"

function GenreBadge({ nombre = "Genero", list = false }) {
    return (
        <div className="inline-flex items-center justify-around px-3 py-1 rounded-full bg-brand-100 text-brand-600 border border-brand-200 gap-2">
            <span className="text font-medium truncate" title={nombre} >{nombre}</span>
            {list && (
                <button className="hover:bg-brand-200 p-0.5 rounded-full transition-colors text-brand-400 hover:text-brand-900 cursor-pointer">
                    <X size={18} />
                </button>
            )}
        </div>
    )
}

export default GenreBadge