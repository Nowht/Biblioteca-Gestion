import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const LineChart = () => {

  const option = {
    responsive: true,
    maintainAspectRatio: false
  }

  const data1 = {
    labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
    datasets: [
      {
        label: "Prestamos Semanales",
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  return (
    <Line data={data1} options={option} />
  )
}