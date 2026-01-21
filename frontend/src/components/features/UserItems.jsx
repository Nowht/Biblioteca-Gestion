import { Link } from "react-router-dom"

function UserItems({ name = "usuario", date = "fecha" }) {
    return (
        <li className="md:hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between p-4">
                <span className="text-sm font-medium text-gray-900">{name}</span>
                <span className="text-xs text-gray-500">{ date ? date.split('T')[0] : date }</span>
            </div>
        </li>
    )
}

export default UserItems