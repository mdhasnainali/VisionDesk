"use client"

import { useRef } from "react"
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js"
import { PolarArea } from "react-chartjs-2"
import { motion } from "framer-motion"

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

type ChartData = {
  working_percentage: string
  idle_percentage: string
  empty_percentage: string
}

const PieChart = ({ data }: { data: ChartData }) => {
  const chartRef = useRef(null)

  const chartData = {
    labels: ["Working", "Idle", "Empty"],
    datasets: [
      {
        label: "Status Distribution",
        data: [
          Number.parseFloat(data.working_percentage),
          Number.parseFloat(data.idle_percentage),
          Number.parseFloat(data.empty_percentage),
        ],
        backgroundColor: [
          "rgba(0, 255, 164, 0.7)", // Working - neon mint (cyber/tech feel)
          "rgba(255, 255, 128, 0.7)", // Idle - soft neon yellow
          "rgba(255, 71, 87, 0.7)", // Empty - neon red/pink (danger alert)
        ],
        borderColor: ["rgba(0, 255, 164, 1)", "rgba(255, 255, 128, 1)", "rgba(255, 71, 87, 1)"],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "white",
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 15, 15, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(0, 149, 255, 0.3)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 700,
        },
        bodyFont: {
          family: "'Inter', sans-serif",
          size: 13,
        },
        displayColors: true,
        boxPadding: 6,
      },
    },
    scales: {
      r: {
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          backdropColor: "transparent",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        pointLabels: {
          color: "white",
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
        },
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto relative"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-blue-600/10 rounded-full blur-xl opacity-30"></div>
        <PolarArea ref={chartRef} data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[rgba(0,255,164,1)]">
            {Number.parseFloat(data.working_percentage).toFixed(1)}%
          </div>
          <div className="text-xs text-neutral-400 uppercase mt-1">Working</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[rgba(255,255,128,1)]">
            {Number.parseFloat(data.idle_percentage).toFixed(1)}%
          </div>
          <div className="text-xs text-neutral-400 uppercase mt-1">Idle</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-[rgba(255,71,87,1)]">
            {Number.parseFloat(data.empty_percentage).toFixed(1)}%
          </div>
          <div className="text-xs text-neutral-400 uppercase mt-1">Empty</div>
        </div>
      </div>
    </motion.div>
  )
}

export default PieChart
