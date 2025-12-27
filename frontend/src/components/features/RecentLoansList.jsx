import { Link } from "react-router-dom"

function RecentLoansList({link}) {
    return (
        <li className=" md:hover:bg-gray-50 transition-colors">
            <Link to={link} className="flex items-center justify-between p-4">
                <span className="text-sm font-medium text-gray-900 truncate">TituloLibro</span>
                <span className="text-xs text-gray-500 ml-4 shrink-0">Devuelto/Prestado</span>
            </Link>
        </li>
    )
}

export default RecentLoansList