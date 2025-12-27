import { LayoutDashboard, Home, Library, User, HandHelping, UserRound, LogOut } from "lucide-react"

import { useState } from "react"

import Modal from "../common/Modal"
import LogOutModal from "../modalcontent/LogOutModal"
import ButtonLink from "../ui/ButtonLink"
import Button from "../ui/Button"

const menuItems = [
  { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { to: "/", icon: <Home size={20} />, label: "Inicio" },
  { to: "/dashboard/books", icon: <Library size={20} />, label: "Libros" },
  { to: "/dashboard/users", icon: <User size={20} />, label: "Usuarios" },
  { to: "/dashboard/loans", icon: <HandHelping size={20} />, label: "Préstamos" },
];

function DashboardLayout({ children, admin = "user", role = "admin" }) {

  const [isLogOutOpen, setIsLogOutOpen] = useState(false)

  const confirmLogout = () => {
    setIsLogOutOpen(true)
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-gray-100">

      {/* 1. SIDEBAR (Solo Desktop) */}
      <aside className="hidden md:flex md:flex-col p-6 w-64 bg-gray-800 min-h-screen text-white">
        <div className="border-b border-gray-700 mb-4 space-y-2">
          <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
          <div className="my-4 flex items-center justify-between gap-3 p-2 bg-gray-700/50 rounded-lg">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs">
                <UserRound size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{admin}</p>
                <p className="text-[10px] text-gray-400">Administrador</p>
              </div>
            </div>
            <Button variant="outlinewhite" onFunc={()=>confirmLogout()}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.to}>
              <ButtonLink to={item.to} variant="slide" className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </ButtonLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4 border-t border-gray-700 opacity-50 text-[10px] text-center tracking-widest uppercase">
          <p>BiblioSoft v1.0</p>
          <p>© 2025 Humberto</p>
        </div>
      </aside>

      {/*BARRA SUPERIOR SOLO MOVIL*/}
      <div className="md:hidden flex justify-between items-center bg-gray-800 p-4 border-b border-gray-200 shadow-sm">
        <span className="font-bold text-white">BiblioSoft</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white">Humberto P.</span>
          <button
            onClick={()=>confirmLogout()}
            className="p-1 text-red-500"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* 2. BARRA INFERIOR (Solo Móvil) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around p-3 z-50 border-t border-gray-700">
        {menuItems.map((item) => (
          <ButtonLink to={item.to} className="flex flex-col items-center gap-1 text-xs">
            {item.icon}
            <span>{item.label}</span>
          </ButtonLink>
        ))}
      </nav>

      {/* 3. CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
        {/* pb-20 evita que la barra inferior tape el contenido */}
        <div className="min-h-full flex flex-col">
          <div className="flex-1">

            <Modal isOpen={isLogOutOpen} onClose={()=>setIsLogOutOpen(false)} >
              <LogOutModal onCancel={()=>setIsLogOutOpen(false)} />
            </Modal>

            {children}
          </div>
          <footer className="md:hidden mt-6 pb-4 text-center text-sm text-gray-400">
            <p>BiblioSoft v1.0 — Diseñado por Humberto</p>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout