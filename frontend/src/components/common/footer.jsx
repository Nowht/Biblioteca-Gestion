function footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Columna 1: Marca/Logo */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">BiblioSoft</h2>
          <p className="text-sm leading-relaxed">
            Sistema local de gestión bibliotecaria diseñado para facilitar el acceso al conocimiento y la cultura.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold mb-2">Navegación</h3>
          <a href="/about" className="hover:text-blue-400 transition-colors">Sobre Nosotros</a>
          <a href="/contact" className="hover:text-blue-400 transition-colors">Contacto</a>
          <a href="/help" className="hover:text-blue-400 transition-colors">Ayuda / FAQ</a>
        </div>

        {/* Columna 3: Info Local */}
        <div>
          <h3 className="text-white font-semibold mb-2">Ubicación y Horario</h3>
          <p className="text-sm">Av. Central #123, Ciudad</p>
          <p className="text-sm mt-2 text-blue-400">Lun - Vie: 8:00 AM - 6:00 PM</p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
        <p>&copy; 2025 BiblioSoft. Diseñado con ❤️ por Humberto.</p>
      </div>
    </footer>
  )
}

export default footer