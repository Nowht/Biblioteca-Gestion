function RecentLoansList({titulo, Devuelto=false}) {

    const style = "text-xs text-gray-500 ml-4 shrink-0"

    const style2 = `${style} ${Devuelto ? "text-green-500" : "text-red-500"}`

    return (
        <li className=" md:hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between p-4">
                <span className="text-sm font-medium text-gray-900 truncate">{ titulo ? titulo : "Sin titulo" }</span>
                <span className={style2}>{ Devuelto ? "Devuelto" : "Prestado" }</span>
            </div>
        </li>
    )
}

export default RecentLoansList