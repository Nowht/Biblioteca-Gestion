const status_styles = {
    disponible: {
        label: "Disponible",
        className: "bg-green-600 text-green-50 border-green-100/50",
    },
    prestado: {
        label: "En prestamo",
        className: "bg-yellow-600 text-yellow-50 border-yellow-100/50",
    },
    mantenimiento: {
        label: "En mantenimiento",
        className: "bg-red-600 text-red-50 border-red-100/50",
    },
};

function BookStatusBadge({ status }) {
    const key = status?.toLowerCase()
    const style = status_styles[key] || {
        label: status,
        className: "bg-gray-100 text-gray-800 border-gray-200"
    };

    return (
        <span className={`ml-2 px-3 py-1 text-xs font-bold rounded-full border-2 shadow-sm ${style.className}`}>
            {style.label}
        </span>
    )
}

export default BookStatusBadge