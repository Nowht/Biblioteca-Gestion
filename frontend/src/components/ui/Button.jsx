function Button({ children, onFunc, variant, className, type = "button" }) {

    const variants = {

        // Estilos para botones
        primary: "bg-blue-500 text-white md:hover:bg-blue-700",
        secondary: "bg-gray-500 text-white md:hover:bg-gray-700",
        danger: "bg-red-500 text-white md:hover:bg-red-700",
        outline: "border-2 border-red-500 text-red-500 md:hover:bg-red-50",
        outlinewhite: "text-white md:hover:text-gray-300",

        edit: "text-gray-400 md:hover:text-blue-600 md:hover:bg-blue-50 rounded-lg",
        delete: "text-gray-400 md:hover:text-red-600 md:hover:bg-red-50 rounded-lg",
        deletenobg:"text-gray-400 md:hover:text-red-600",
    }

    const BaseStyles = "px-4 py-2 font-bold rounded-full transition-colors duration-200 inline-flex items-center justify-center";

    const CombinedClasses = `${BaseStyles} ${variants[variant]} ${className}`;

    return (
        <button className={CombinedClasses} type={type} onClick={onFunc}>
            {children}
        </button>
    )
}

export default Button