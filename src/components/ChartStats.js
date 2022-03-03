import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DoughnutChart () {
  const [chartData, setChartData] = useState({
    datasets: []
  })
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartData({
      labels: ['Arul', 'Rijal', 'Fakhrul'],
      datasets: [
        {
          label: 'Greatest Score',
          data: [12, 24, 14],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.4)'
        }
      ]
    })

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: "Who's Winner"
        }
      }
    })
  }, [])

  return (
    <div>
      <Bar options={chartOptions} data={chartData} />
    </div>
  )
}
