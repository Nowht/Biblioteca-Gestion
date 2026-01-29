import FormField from "../forms/FormField"
import Button from "../ui/Button"

import { CalendarCog } from "lucide-react"

import { useForm } from "react-hook-form"
import { useEffect } from "react"

import { useUpdateLoan } from "../../hooks/useLoans"

function RenewLoanModal({ onCancel, dataofloan }) {

    const { register, handleSubmit, formState:{errors, isSubmitting}, reset } = useForm()

    useEffect(()=>{
        if(dataofloan){
            reset(dataofloan)
        }
    }, [dataofloan, reset])

    const { mutate } = useUpdateLoan(true)

    const handleRenew = (data) => {

        const { id, fecha_devolucion_esperada } = data

        mutate({
            id,
            data: {
                fecha_devolucion_esperada: fecha_devolucion_esperada
            }
        })
        onCancel()
    }

    return (
        <div className="flex flex-col items-center space-y-4 pt-8 pb-4 px-8">
            <h1 className="text-xl font-bold capitalize">Actualizar fecha de entrega</h1>
            <CalendarCog size={80} />

            <form onSubmit={handleSubmit(handleRenew)} className="space-y-4">
                <FormField type="date" name="fecha_devolucion_esperada" {...register("fecha_devolucion_esperada", {required: "La fecha es requerida"})} error={errors.fecha_devolucion_esperada} />
                <div className="flex gap-x-4">
                    <Button variant="secondary" onFunc={onCancel} disabled={isSubmitting} >Cancelar</Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting} >{isSubmitting ? "Actualizando..." : "Actualizar" }</Button>
                </div>
            </form>

        </div>
    )
}

export default RenewLoanModal