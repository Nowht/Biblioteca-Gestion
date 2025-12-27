import { Link } from "react-router-dom"

function UserItems({ name = "usuario", date = "fecha", link }) {
    return (
        <li className="md:hover:bg-gray-50 transition-colors">
            <Link to={link} className="flex items-center justify-between p-4">
                <span className="text-sm font-medium text-gray-900">{name}</span>
                <span className="text-xs text-gray-500">{date}</span>
            </Link>
        </li>
    )
}

export default UserItems