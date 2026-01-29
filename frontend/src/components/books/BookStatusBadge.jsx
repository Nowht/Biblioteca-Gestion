const status_styles = {
    disponible: {
        label: "Disponible",
        className: "bg-brand-500 text-white border-brand-100/50",
    },
    prestado: {
        label: "En prestamo",
        className: "border border-brand-500 text-brand-500 border-brand-100/50",
    },
    mantenimiento: {
        label: "En mantenimiento",
        className: "bg-brand-100 text-brand-700 hover:bg-brand-200 border-brand-100/50",
    },
};

function BookStatusBadge({ status }) {
    const key = status?.toLowerCase()
    const style = status_styles[key] || {
        label: status,
        className: "bg-brand-100 text-brand-800 border-brand-200"
    };

    return (
        <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 shadow-sm ${style.className}`}>
            {style.label}
        </span>
    )
}

export default BookStatusBadge