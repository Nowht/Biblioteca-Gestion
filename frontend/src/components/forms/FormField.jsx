function FormField({
    label,
    name,
    type,
    required = false,
    value,
    onChange,
    options = [],
    placeholder,
    className = ''
}) {
    const baseClass = "ml-auto border bg-gray-50 border-gray-300 rounded px-3 py-2 w-full text-black";

    const checkboxstyle = "w-4 h-4 bg-gray-50 rounded-xs"

    if (!type) {
        return (
            <div className="flex flex-col gap-1.5 font">
                <label htmlFor={name} className="text-lg font-bold">{label}</label>
                <select
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className={`${baseClass} ${className}`}
                    required={required}
                >
                    {placeholder && (
                        <option value="" disabled hidden>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt, i) => {
                        if (typeof opt === 'object') {
                            return (
                                <option key={i} value={opt.value}>
                                    {opt.label}
                                </option>
                            );
                        }
                        return (
                            <option key={i} value={opt}>
                                {opt}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }

    if (type == "checkbox") {

        return (
            <div className="flex items-center justify-center gap-2">
                <input
                    id={name}
                    name={name}
                    type={type}
                    className={`${checkboxstyle} ${className}`}
                    required={required}
                    checked={value}
                    onChange={onChange}
                />
                <label htmlFor={name} className="text-lg font-bold ms-2">{label}</label>
            </div>
        )
    }

    if (type == "textarea") {
        return (
            <div className="flex flex-col gap-1.5">
                <label htmlFor={name} className="text-lg font-bold">{label}</label>
                <textarea name={name} rows="4" className={`${baseClass} ${className}`} ></textarea>
            </div>
        );
    }

return (
    <div className="flex flex-col gap-1.5">
        <label htmlFor={name} className="text-lg font-bold">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            className={`${baseClass} ${className}`}
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);
}

export default FormField;