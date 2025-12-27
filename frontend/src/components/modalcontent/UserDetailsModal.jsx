import { User } from "lucide-react"

function UserDetailsModal({ id = "1", user = "usuario", role = "user/admin", date = "fecha" }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
          <User size={50}/>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900">{user}</h4>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
            {role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8 py-4">
        <div>
          <p className="text-xs uppercase text-gray-500 font-bold mb-1">ID Usuario</p>
          <p className="text-sm font-medium">{id}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-gray-500 font-bold mb-1">Fecha Registro</p>
          <p className="text-sm font-medium">{date}</p>
        </div>
      </div>

      <div>
        <h5 className="text-sm font-bold text-gray-800 mb-2">
          Prestamos
        </h5>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500 italic">No hay libros pendientes de devolucion.</p>
        </div>
      </div>

    </div>
  )
}

export default UserDetailsModal