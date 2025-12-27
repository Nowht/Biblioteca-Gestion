import { useState } from 'react';
import { Search, X } from 'lucide-react'; // Librería de iconos recomendada

// const SearchBar = ({ onSearch, placeholder = "Buscar libros..." }) => {
//   const [query, setQuery] = useState('');

//   const handleClear = () => {
//     setQuery('');
//     onSearch('');
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     onSearch(value); // Filtro en tiempo real
//   };

function SearchBar(){

  return (
    <div className="relative w-full max-w-md">
      {/* Icono de Lupa */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>

      <input
        type="search"
        className="block w-full p-2.5 pl-10 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      />
    </div>
  );
};

export default SearchBar;