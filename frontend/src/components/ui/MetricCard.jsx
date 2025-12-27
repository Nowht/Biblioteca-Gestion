function MetricCard({title, value, icon}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-2xl font-bold text-blue-500">{value}</p>
        </div>
        <div className="text-gray-500">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default MetricCard