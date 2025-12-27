import FormField from "../components/forms/FormField"
import Button from "../components/ui/Button"

function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
        <section className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">¡Contactanos!</h1>
            <p className="mt-4 text-lg text-gray-600">Si tienes alguna sugerencia o queja, comunicalo.</p>
        </section>
        <form className="grid gap-8">
            <FormField label="Nombre" type="text" placeholder="Escriba su nombre"/>
            <FormField label="Correo" type="text" placeholder="Escriba su Correo"/>
            <FormField label="Mensaje" type="textarea" placeholder="Escriba su mensaje"/>
            <Button type="submit" variant="primary" className="justify-self-center md:text-xl">Enviar</Button>
        </form>
    </div>
  )
}

export default ContactPage