import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const LineChart = ({ labels, dataValues, labelTitle, color='rgb(75, 192, 192)' }) => {

  const option = {
    responsive: true,
    maintainAspectRatio: false
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: labelTitle,
        data: dataValues,
        fill: false,
        borderColor: color,
        tension: 0.1
      }
    ]
  }

  return (
    <Line data={data} options={option} />
  )
}