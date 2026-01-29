import { Link } from 'react-router-dom'

function ButtonLink({ children, to, variant, className, OnClick}) {

  const animacionLink = "md:hover:scale-105 transition-all duration-200 ease-in-out";

  const bottonStyles = "px-4 py-2 rounded-full"

  const variants = {

    // Estilos para links con forma de botones
    primary: `bg-brand-500 text-white md:hover:bg-brand-600 ${bottonStyles}`,
    secondary: `bg-brand-100 text-brand-700 md:hover:bg-brand-200 ${bottonStyles}`,
    danger: `text-slate-400 hover:text-red-600 hover:bg-red-50 ${bottonStyles}`,
    outline: `bg-red-500 md:hover:bg-red-700 ${bottonStyles}`,

    edit: "text-slate-400 hover:bg-brand-100 rounded-full px-4 py-2",  

    // Estilos de para Links
    nav: `font-normal md:hover:text-brand-500 ${animacionLink}`,
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