function Button({ children, onFunc, variant, className, type = "button", disabled }) {

    const variants = {

        // Estilos para botones
        primary: "bg-brand-500 text-white md:hover:bg-brand-600",
        secondary: "bg-brand-100 text-brand-700 md:hover:bg-brand-200",
        danger: "text-slate-400 md:hover:text-red-600 md:hover:bg-red-50",
        outline: "text-slate-400 md:hover:text-red-600 md:hover:bg-red-50",
        outlinewhite: "text-white md:hover:text-gray-300",
        green: "bg-green-500 text-white md:hover:bg-green-600",
        edit: "text-brand-500 md:hover:bg-brand-200 rounded-lg",
        delete: "text-slate-400 md:hover:text-red-600 md:hover:bg-red-50 rounded-lg",
        deletenobg:"text-slate-400 md:hover:text-red-600 md:hover:bg-red-50",
    }

    const BaseStyles = "flex px-4 py-2 font-bold rounded-full transition-colors duration-200 items-center justify-center gap-2";

    const CombinedClasses = `${BaseStyles} ${variants[variant]} ${className}`;

    return (
        <button className={CombinedClasses} type={type} onClick={onFunc} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button