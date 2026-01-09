import Button from "../components/ui/Button"
import FormField from "../components/forms/FormField"

import { useForm } from "react-hook-form"

import { logIn } from "../services/api"

import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

import { useContext } from "react"

function LoginPage() {

  const { user, login } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      // Enviamos los datos del formulario
      const response = await logIn(data)


      // Enviamos los datos al contexto de autenticacion
      login(response.data)

      if (response.data.is_staff == true) {
        navigate("/dashboard")
      } else {
        navigate("/")
      }

    } catch (error) {
      setError("root", {
        message: "usuario u contraseña incorrecta"
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto md:bg-blue-500 md:shadow-xl md:shadow-blue-500/50 md:rounded-xl p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500 md:text-white">Iniciar Sesión</h2>
        <div className="grid gap-4 mb-6">
          <FormField
            label="Usuario"
            name="username"
            type="text"
            classNameLabel="md:text-white"
            {...register("username", { required: "Este campo es obligatorio" })}
            error={errors.username} />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            classNameLabel="md:text-white"
            {...register("password", {
              required: true, minLength: {
                value: 8,
                message: "La contraseña debe de tener mas de 8 caracteres"
              }
            })}
            error={errors.password} />
        </div>
        {errors.root && <span className="text-white text-sm font-bold flex justify-center mb-5">{errors.root.message}</span>}
        <div className="flex items-center justify-center">
          <Button type="submit" variant="green" disabled={isSubmitting}>
            {isSubmitting ? "Cargando..." : "Ingresar"}</Button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage