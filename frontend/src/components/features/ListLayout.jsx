function ListLayout({ children }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
                {children}
            </ul>
        </div>
    )
}

export default ListLayout