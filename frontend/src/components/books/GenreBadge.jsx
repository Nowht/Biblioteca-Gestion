function GenreBadge({ nombre = "Sin Género", isSelected, onToggle }) {

    const basestyle = "bg-brand-100 text-brand-600 border-brand-200"
    const todelete = "bg-brand-200 text-brand-900 border-brand-200"

    return (
        <div
            className={`inline-flex items-center justify-around px-3 py-1 rounded-full border gap-2 ${isSelected ? todelete : basestyle}`}
            onClick={onToggle}
        >
            <span className="text font-medium text-sm truncate" title={nombre} >{nombre}</span>
        </div>

    )
}

export default GenreBadge