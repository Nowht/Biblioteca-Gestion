import Button from "../components/ui/Button"
import FormField from "../components/forms/FormField"

import { useForm } from "react-hook-form"

import { logIn } from "../services/api"

import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/AuthContext"

import { useContext } from "react"

import { toast } from "react-hot-toast"

function LoginPage() {

  const { login } = useContext(AuthContext)

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
      setError("root", { type: "server", message: "Usuario o contraseña incorrectos" });
      toast.error("Error al iniciar sesion")
    }
  }
  return (
    <div className="w-full max-w-md mx-auto md:bg-gray-700 md:shadow-xl md:shadow-gray-500/50 md:rounded-xl p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-6 text-center text-brand-500 md:text-white">Iniciar Sesión</h2>
        <div className="grid gap-4 mb-6">
          <FormField
            label="Usuario"
            name="username"
            type="text"
            classNameLabel="md:text-white"
            error={errors.username}
            {...register("username", { required: "Este campo es obligatorio" })}
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            classNameLabel="md:text-white"
            error={errors.password}
            {...register("password", {
              required: true, minLength: {
                value: 8,
                message: "La contraseña debe de tener mas de 8 caracteres"
              }
            })}
          />
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