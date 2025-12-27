import { Link } from 'react-router-dom'

function ButtonLink({ children, to, variant, className, OnClick}) {

  const animacionLink = "md:hover:scale-105 transition-all duration-200 ease-in-out";

  const bottonStyles = "text-white px-4 py-2 rounded-full"

  const variants = {

    // Estilos para links con forma de botones
    primary: `bg-blue-500 md:hover:bg-blue-700 ${bottonStyles}`,
    secondary: `bg-gray-500 md:hover:bg-gray-700 ${bottonStyles}`,
    danger: `bg-red-500 text-white md:hover:bg-red-700 ${bottonStyles}`,
    outline: `bg-red-500 md:hover:bg-red-700 ${bottonStyles}`,

    edit: "text-gray-400 md:hover:text-blue-600 transition-colors",  

    // Estilos de para Links
    nav: `font-normal md:hover:text-blue-500 ${animacionLink}`,
    slide: `text-white md:hover:text-gray-300 ${animacionLink}`,
  }

  const baseStyles = "flex font-bold items-center justify-center gap-1";

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <Link to={to} className={combinedClasses} onClick={OnClick}>
      {children}
    </Link>
  )
}

export default ButtonLink