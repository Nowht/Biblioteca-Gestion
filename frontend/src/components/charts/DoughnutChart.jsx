import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export const DoughnutChart = () => {
    const data = {
        labels: ["Ficcion", "No Ficcion", "Ciencia", "Historia"],
        datasets:[
            {
                label: "Categorias de Libros",
                data: [40, 25, 20, 15],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }
        ]
    }

    return (
        <Doughnut data={data} />
    )
}