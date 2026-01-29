import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Usamos forwardRef para que React Hook Form pueda acceder al input interno
const FormField = forwardRef(({
    label,
    name,
    type,
    error, // Nueva prop para mostrar mensajes de error de la librería
    options = [],
    placeholder,
    classNameInput = '',
    classNameLabel = '',
    ...props // Aquí vendrán onChange, onBlur, value de RHF
}, ref) => {
    
    const [isVisible, setIsVisible] = useState(false);

    const baseClass = "border bg-gray-50 border-gray-300 rounded px-3 py-2 w-full text-black focus:ring-2 focus:ring-brand-500 outline-none transition-all";
    const checkboxStyle = "w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 cursor-pointer";
    const labelStyle = "text-lg font-bold text-gray-700";

    // Componente para mostrar errores
    const ErrorMessage = () => error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
    );

    // Renderizado de SELECT
    if (type === "select" || (!type && options.length > 0)) {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor={name} className={`${labelStyle} ${classNameLabel}`}>{label}</label>
                <select
                    id={name}
                    name={name}
                    ref={ref}
                    className={`${baseClass} ${classNameInput} ${error ? 'border-red-500' : ''}`}
                    {...props}
                >
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((opt, i) => (
                        <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
                            {typeof opt === 'object' ? opt.label : opt}
                        </option>
                    ))}
                </select>
                <ErrorMessage />
            </div>
        );
    }

    // Renderizado de CHECKBOX
    if (type === "checkbox") {
        return (
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 cursor-pointer">
                    <input
                        id={name}
                        name={name}
                        type="checkbox"
                        ref={ref}
                        className={`${checkboxStyle} ${classNameInput}`}
                        {...props}
                    />
                    <label htmlFor={name} className={`${labelStyle} cursor-pointer ${classNameLabel}`}>{label}</label>
                </div>
                <ErrorMessage />
            </div>
        );
    }

    // Renderizado de TEXTAREA
    if (type === "textarea") {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor={name} className={`${labelStyle} ${classNameLabel}`}>{label}</label>
                <textarea 
                    id={name}
                    name={name}
                    ref={ref}
                    rows="4" 
                    className={`${baseClass} ${classNameInput} ${error ? 'border-red-500' : ''}`}
                    placeholder={placeholder}
                    {...props}
                />
                <ErrorMessage />
            </div>
        );
    }

    // Renderizado de INPUTS (Texto, Password, etc.)
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor={name} className={`${labelStyle} ${classNameLabel}`}>{label}</label>
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    ref={ref}
                    type={type === "password" && isVisible ? "text" : type}
                    className={`${baseClass} ${classNameInput} ${error ? 'border-red-500' : ''} ${type === 'password' ? 'pr-10' : ''}`}
                    placeholder={placeholder}
                    {...props}
                />
                {type === "password" && (
                    <button 
                        type="button" 
                        onClick={() => setIsVisible(!isVisible)} 
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-brand-600 transition-colors"
                    >
                        {isVisible ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                )}
            </div>
            <ErrorMessage />
        </div>
    );
});

FormField.displayName = 'FormField'; // Buena práctica al usar forwardRef

export default FormField;