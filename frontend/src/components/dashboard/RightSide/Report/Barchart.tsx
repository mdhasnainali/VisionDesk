"use client"

import { useRef } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { motion } from "framer-motion"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type BarchartProps = {
  total_working_time: string
  total_idle_time: string
  total_empty_time: string
}

const Barchart = ({ data }: { data: BarchartProps }) => {
  const chartRef = useRef(null)

  const chartData = {
    labels: ["Working", "Idle", "Empty"],
    datasets: [
      {
        label: "Time (hours)",
        data: [
          Number.parseFloat(data.total_working_time),
          Number.parseFloat(data.total_idle_time),
          Number.parseFloat(data.total_empty_time),
        ],
        backgroundColor: [
          "rgba(0, 255, 164, 0.7)", // Working - neon mint
          "rgba(255, 255, 128, 0.7)", // Idle - neon yellow
          "rgba(255, 71, 87, 0.7)", // Empty - neon red
        ],
        borderColor: ["rgba(0, 255, 164, 1)", "rgba(255, 255, 128, 1)", "rgba(255, 71, 87, 1)"],
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: ["rgba(0, 255, 164, 0.9)", "rgba(255, 255, 128, 0.9)", "rgba(255, 71, 87, 0.9)"],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || ""
            if (label) {
              label += ": "
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2) + " hours"
            }
            return label
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            family: "'Inter', sans-serif",
          },
          callback: (value: any) => value + " hrs",
        },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 2000,
    },
  }

  const totalTime =
    Number.parseFloat(data.total_working_time) +
    Number.parseFloat(data.total_idle_time) +
    Number.parseFloat(data.total_empty_time)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-blue-600/10 rounded-xl blur-xl opacity-30"></div>
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4">
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
          <div className="text-sm text-neutral-400 mb-2">TOTAL TIME LOGGED</div>
          <div className="text-2xl font-bold text-white">{totalTime.toFixed(2)} hours</div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-400">Working</span>
                <span className="text-[rgba(0,255,164,1)]">
                  {((Number.parseFloat(data.total_working_time) / totalTime) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5">
                <div
                  className="bg-[rgba(0,255,164,1)] h-1.5 rounded-full"
                  style={{ width: `${(Number.parseFloat(data.total_working_time) / totalTime) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-400">Idle</span>
                <span className="text-[rgba(255,255,128,1)]">
                  {((Number.parseFloat(data.total_idle_time) / totalTime) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5">
                <div
                  className="bg-[rgba(255,255,128,1)] h-1.5 rounded-full"
                  style={{ width: `${(Number.parseFloat(data.total_idle_time) / totalTime) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-neutral-400">Empty</span>
                <span className="text-[rgba(255,71,87,1)]">
                  {((Number.parseFloat(data.total_empty_time) / totalTime) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-neutral-800 rounded-full h-1.5">
                <div
                  className="bg-[rgba(255,71,87,1)] h-1.5 rounded-full"
                  style={{ width: `${(Number.parseFloat(data.total_empty_time) / totalTime) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Barchart
