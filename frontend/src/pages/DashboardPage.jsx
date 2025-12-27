import { Link } from "react-router-dom"

import MetricCard from "../components/ui/MetricCard"

import { LineChart } from "../components/charts/LineChart"

import ListLayout from "../components/features/ListLayout"
import RecentLoansList from "../components/features/RecentLoansList"
import UserItems from "../components/features/UserItems"

import { Book, Users, HandHelping, Calendar } from "lucide-react"

function DashboardPage({username="admin"}) {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">¡Bienvenido, {username}!</h1>
        <p className="text-gray-600">Un resumen rápido de la actividad de tu biblioteca.</p>
      </header>

      <section className="w-full grid justify-items-center grid-cols-1 md:grid-cols-2 mb-8 gap-4">
        <div className="w-full h-70 md:min-h-80"><LineChart /></div>
        <div className="w-full h-70 md:min-h-80"><LineChart /></div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Libros" value="120" icon={<Book size={32} />} />
        <MetricCard title="Usuarios" value="45" icon={<Users size={32} />} />
        <MetricCard title="Prestamos" value="30" icon={<HandHelping size={32} />} />
        <MetricCard title="Reservas" value="15" icon={<Calendar size={32} />} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-500 mb-4">Actividad Reciente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white shadow-lg rounded-lg p-6 h-74 flex flex-col">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Últimos Usuarios</h3>
              <Link to="/dashboard/users" className="text-end text-sm font-medium text-indigo-600 md:hover:text-indigo-800 transition-colors">
                Administrar Usuarios
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ListLayout>
                <UserItems />
                <UserItems />
              </ListLayout>
            </div>

          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 h-74">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Ultimos Prestamos</h3>
              <Link to="/dashboard/loans" className="text-end text-sm font-medium text-indigo-600 md:hover:text-indigo-800 transition-colors">
                Administrar Préstamos
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ListLayout>
                <RecentLoansList />
              </ListLayout>
            </div>

          </div>

        </div>
      </section>

    </>
  )
}

export default DashboardPage