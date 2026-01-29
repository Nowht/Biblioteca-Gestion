import { Link } from "react-router-dom"

import MetricCard from "../components/ui/MetricCard"

import { LineChart } from "../components/charts/LineChart"

import ListLayout from "../components/features/ListLayout"
import RecentLoansList from "../components/features/RecentLoansList"
import UserItems from "../components/features/UserItems"

import { Book, Users, HandHelping, Calendar } from "lucide-react"

import { useContext } from "react"

import { AuthContext } from "../context/AuthContext.jsx"

import { useStats, useChartStats, useRecentStats } from "../hooks/useStats.js"

function DashboardPage() {

  const { data: cardstats, isLoading } = useStats()

  const { user } = useContext(AuthContext)

  const { data: chartstats, isLoading: cargando } = useChartStats()

  const { data: recent, isLoading: cargando_reciente } = useRecentStats()

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">¡Bienvenido, {user?.username}!</h1>
        <p className="text-gray-600">Un resumen rápido de la actividad de tu biblioteca.</p>
      </header>

      <section className="w-full grid justify-items-center grid-cols-1 md:grid-cols-2 mb-8 gap-4 md:min-h-80">
        {chartstats && (
          <>
            <div className="w-full h-70">
              <LineChart labels={chartstats.usuarios.labels} dataValues={chartstats.usuarios.values} labelTitle="Usuarios recientes" color="rgb(106 123 164)" />
            </div>
            <div className="w-full h-70">
              <LineChart labels={chartstats.prestamos.labels} dataValues={chartstats.prestamos.values} labelTitle="Prestamos recientes" color="rgb(106 123 164)" />
            </div>
          </>
        )}
        {isLoading && <p>Cargando visualizaciones...</p>}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Libros" value={cardstats?.libros || 0} icon={<Book size={32} />} />
        <MetricCard title="Usuarios" value={cardstats?.usuarios || 0} icon={<Users size={32} />} />
        <MetricCard title="Prestamos" value={cardstats?.prestamos || 0} icon={<HandHelping size={32} />} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-500 mb-4">Actividad Reciente</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white shadow-lg rounded-lg p-6 h-80 flex flex-col">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Últimos Usuarios</h3>
              <Link to="/dashboard/users" className="text-end text-sm font-medium text-brand-600 md:hover:text-brand-800 transition-colors">
                Administrar Usuarios
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ListLayout>
                {recent && (recent.usuarios_recientes.map((i) => (
                  <UserItems name={i.username} key={i.id} date={i.date_joined} />
                )))}
              </ListLayout>
            </div>

          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 h-80 flex flex-col">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Ultimos Prestamos</h3>
              <Link to="/dashboard/loans" className="text-end text-sm font-medium text-brand-600 md:hover:text-brand-800 transition-colors">
                Administrar Préstamos
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ListLayout>
                {recent && (recent.prestamos_recientes.map((p) => (
                  <RecentLoansList key={p.id} titulo={p.libro} Devuelto={p.devuelto} />
                )))}
              </ListLayout>
            </div>

          </div>

        </div>
      </section>

    </>
  )
}

export default DashboardPage