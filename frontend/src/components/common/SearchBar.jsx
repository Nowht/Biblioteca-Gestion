import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react'; // Librería de iconos

function SearchBar({ onSearch, placeholdertext = "Buscar..." }){

  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(text)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      {/* Icono de Lupa */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>

      <input
        type="text"
        className="block w-full p-2.5 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        placeholder={placeholdertext}
        onChange={ (e) => setText(e.target.value) }
      />
    </form>
  );
};

export default SearchBar;