import Button from "../ui/Button";
import ButtonLink from "../ui/ButtonLink";

import { useState } from "react";

import { Menu, X, LogOut } from "lucide-react";

const menuLinks = [
    { label: "Sobre Nosotros", to: "/about" },
    { label: "Contacto", to: "/contact" },
    { label: "Mis Prestamos", to: "/loans" },
]

function navbar({ username = "user", role = "user/admin", onExit }) {

    const [isOpen, setIsOpen] = useState(false);

    const isLogedIn = true;
    const isAdmin = true;

    return (
        // Agregamos relative para controlar el despliegue del menú móvil
        <nav className="m-4 md:m-8 relative">
            {/* CONTENEDOR PRINCIPAL */}
            <div className="flex justify-between items-center p-4 bg-white rounded-full shadow-xl border border-gray-100 px-6 md:px-8">

                {/* LOGO */}
                <a href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div> {/* Placeholder de icono */}
                    <h1 className="text-blue-500 font-bold text-xl md:text-2xl">Biblioteca</h1>
                </a>

                {/* LINKS DESKTOP (Ocultos en móvil) */}
                <ul className="hidden md:flex justify-center gap-8">

                    {menuLinks.map((link) => (
                        <li>
                            <ButtonLink variant="nav" to={link.to}>{link.label}</ButtonLink>
                        </li>
                    ))}

                    {isAdmin && <li><ButtonLink variant="nav" to="/dashboard">Dashboard</ButtonLink></li>}
                </ul>

                {/* BOTONES ACCIÓN / HAMBURGUESA */}
                <div className="flex items-center gap-2">
                    {/* Botón Login/Salir (Visible solo en desktop o adaptado) */}
                    <div className="hidden md:block">
                        {isLogedIn ? (
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col text-right">
                                    <span className="text-sm font-bold text-gray-800 leading-none">{username}</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">{role}</span>
                                </div>
                                <Button variant="danger" onFunc={onExit}>
                                    <LogOut size={20} />
                                </Button>
                            </div>
                        ) : (
                            <ButtonLink variant="primary" to="/login">Iniciar</ButtonLink>
                        )}
                    </div>

                    {/* BOTÓN MENÚ (Solo móvil) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 md:hover:bg-gray-100 rounded-full transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* MENÚ DESPLEGABLE MÓVIL */}
            {isOpen && (
                <div className="absolute top-20 left-0 right-0 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-4 md:hidden z-50 animate-in fade-in zoom-in duration-200">

                    {menuLinks.map((link) => (
                        <ButtonLink variant="nav" to={link.to} OnClick={() => setIsOpen(false)}>{link.label}</ButtonLink>
                    ))}

                    {isAdmin && (
                        <ButtonLink variant="nav" to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</ButtonLink>
                    )}
                    <hr className="border-gray-100" />
                    {isLogedIn ? (
                        <div className="flex items-center justify-around">
                            <div className="flex flex-col text-start">
                                <span className="text-sm font-bold text-gray-800 leading-none">{username}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-wide">{role}</span>
                            </div>
                            <Button variant="danger" onFunc={onExit}>
                                <LogOut size={20} />
                            </Button>
                        </div>
                    ) : (
                        <ButtonLink variant="primary" to="/login">Iniciar Sesión</ButtonLink>
                    )}
                </div>
            )}
        </nav>
    );
}

export default navbar;