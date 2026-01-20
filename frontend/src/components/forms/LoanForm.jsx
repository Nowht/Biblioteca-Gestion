import FormField from "./FormField"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"

import { useForm, Controller } from "react-hook-form"

import { useBooks } from "../../hooks/useBooks"
import { useUsers } from "../../hooks/useUsers"

import { useCreateLoan } from "../../hooks/useLoans"

import Select from "react-select"

function LoanForm() {

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm()

    const { data: libros, isLoading: cargandoLibro } = useBooks()
    const { data: usuario, isLoading: cargandoUsuario } = useUsers()

    const { mutate, isLoading } = useCreateLoan()

    const optionsUser = usuario?.map(u => ({
        value: u.id,
        label: u.username
    })) || []

    const optionBooks = libros?.map(bk => ({
        value: bk.id,
        label: bk.titulo
    })) || []


    const onSubmit = (data) => {

        mutate(data, {
            onSuccess: () => reset(),
        })
    }

    return (
        /* Estructura lógica del formulario */
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            {/* SECCIÓN 1: ¿Quién y Qué? */}
            <div className="md:col-span-2 space-y-4">
                <h2 className="text-lg font-semibold border-b pb-2">Información del Préstamo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Aquí iría tu componente de búsqueda de usuario */}
                    <Controller
                        name="usuario"
                        control={control}
                        rules={{ required: "Debes seleccionar un usuario" }}
                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                            <div>
                                <Select
                                    inputRef={ref}
                                    options={optionsUser}
                                    isLoading={cargandoUsuario}
                                    placeholder="Escribe para buscar el usuario"
                                    value={optionsUser.find(usr => usr.value === value)}
                                    onChange={val => onChange(val.value)}
                                    classNamePrefix="select"
                                />
                                {error && <span className="text-red-500">{error.message}</span>}
                            </div>
                        )}
                    />

                    {/* Aquí iría tu componente de búsqueda de libro */}
                    <Controller
                        name="libro"
                        control={control}
                        rules={{ required: "Debes seleccionar un libro" }}
                        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                            <div>
                                <Select
                                    inputRef={ref}
                                    options={optionBooks}
                                    isLoading={cargandoLibro}
                                    placeholder="Escribe para buscar el libro"
                                    value={optionBooks.find(lbr => lbr.value === value)}
                                    onChange={val => onChange(val.value)}
                                    classNamePrefix="select"
                                />
                                {error && <span className="text-red-500">{error.message}</span>}
                            </div>
                        )}
                    />

                </div>
            </div>

            {/* SECCIÓN 2: Tiempos */}
            <div className="space-y-2">
                <FormField
                    label="Fecha de Inicio"
                    name="startDate"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    {...register("fecha_inicio", { required: "Este campo es requerido" })}
                    error={errors.fecha_inicio}
                />
            </div>
            <div className="space-y-2">
                <FormField
                    label="Fecha de Devolución"
                    name="endDate"
                    type="date"
                    {...register("fecha_devolucion_esperada", { required: "Este campo es requerido" })}
                    error={errors.fecha_devolucion_esperada}
                />
            </div>

            {/* SECCIÓN 3: Detalles extras */}
            <div className="md:col-span-2">
                <FormField
                    label="Notas adicionales"
                    name="notes"
                    type="textarea"
                    placeholder="Ej. El libro tiene la portada un poco desgastada..."
                    {...register("notas")}
                />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <ButtonLink to="/dashboard/loans" variant="outline">Cancelar</ButtonLink>
                <Button type="submit" variant="primary">Confirmar Préstamo</Button>
            </div>
        </form>
    )
}

export default LoanForm