import ButtonLink from "../components/ui/ButtonLink"

function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto md:bg-blue-500 md:shadow-xl md:shadow-blue-500/50 md:rounded-xl p-8">
      <form action="">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500 md:text-white">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block text-blue-500 md:text-white text-sm font-bold mb-2" htmlFor="username">
            Usuario
          </label>
          <input
            className="shadow border border-white rounded-2xl w-full py-2 px-3 text-black leading-tight bg-white focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Usuario"
          />
        </div>
        <div className="mb-6">
          <label className="block text-blue-500 md:text-white text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow border border-white rounded-2xl w-full py-2 px-3 text-black bg-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
          />
        </div>
        <div className="flex items-center justify-center">
          <ButtonLink variant="secondary" className="hidden md:inline-block">Ingresar</ButtonLink>
          <ButtonLink variant="primary" className="md:hidden">Ingresar</ButtonLink>
        </div>
      </form>
    </div>
  )
}

export default LoginPage