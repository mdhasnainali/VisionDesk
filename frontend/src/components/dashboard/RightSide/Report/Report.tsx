"use client"

import type React from "react"

import { format } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { BarChart3, CalendarIcon, Loader2, PieChart, Trophy } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import api from "@/lib/api"
import { cn } from "@/lib/utils"
import Barchart from "./Barchart"
import DeskScore from "./DeskScore"
import PieChartComponent from "./PieChart"


const Report = () => {
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Simulated loading effect for futuristic feel
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 50)
      return () => clearInterval(interval)
    } else {
      setLoadingProgress(0)
    }
  }, [loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const FromDate = fromDate ? format(fromDate, "yyyy-MM-dd") : null
    const ToDate = toDate ? format(toDate, "yyyy-MM-dd") : null

    if (!FromDate || !ToDate) {
      toast.error("Please select both From and To dates.")
      return
    }

    try {
      setLoading(true)
      const res = await api.post(`administrator/report/?type=report&start=${FromDate}&end=${ToDate}`)
      setData(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("Failed to fetch report data. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-950 text-white">
      {/* Animated background grid */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl"
        >
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 pb-2">
            SYSTEM ANALYTICS
          </h1>
          <p className="text-center text-neutral-400 text-sm mb-8">TEMPORAL DATA VISUALIZATION MODULE</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl border border-neutral-800 rounded-2xl shadow-[0_0_15px_rgba(0,149,255,0.15)] backdrop-blur-sm bg-neutral-950/70 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* From Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2 text-neutral-300">FROM DATE</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800/70 hover:border-blue-500/50 transition-all duration-300",
                        !fromDate && "text-neutral-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-cyan-400" />
                      {fromDate ? format(fromDate, "PPP") : <span>Select start date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-neutral-700 bg-neutral-900" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                      className="bg-neutral-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* To Date */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2 text-neutral-300">TO DATE</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800/70 hover:border-blue-500/50 transition-all duration-300",
                        !toDate && "text-neutral-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-cyan-400" />
                      {toDate ? format(toDate, "PPP") : <span>Select end date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-neutral-700 bg-neutral-900" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                      className="bg-neutral-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(0,149,255,0.5)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Processing Data... {loadingProgress}%</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">GENERATE REPORT</span>
                  </>
                )}
              </span>
              {loading && (
                <span
                  className="absolute bottom-0 left-0 h-1 bg-cyan-300"
                  style={{ width: `${loadingProgress}%`, transition: "width 0.2s ease-out" }}
                />
              )}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-cyan-400/30 to-blue-600/0 -translate-x-full group-hover:animate-shimmer" />
            </Button>
          </form>
        </motion.div>

        <AnimatePresence>
          {data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl"
            >
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-neutral-900/50 border border-neutral-800 rounded-lg p-1">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/80 data-[state=active]:to-cyan-500/80 data-[state=active]:text-white"
                  >
                    <PieChart className="mr-2 h-4 w-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="time"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/80 data-[state=active]:to-cyan-500/80 data-[state=active]:text-white"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Time Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="scores"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600/80 data-[state=active]:to-cyan-500/80 data-[state=active]:text-white"
                  >
                    <Trophy className="mr-2 h-4 w-4" />
                    Desk Scores
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                  <div className="border border-neutral-800 rounded-2xl shadow-[0_0_15px_rgba(0,149,255,0.1)] backdrop-blur-sm bg-neutral-950/70 p-6">
                    <h2 className="text-xl font-bold mb-6 text-center text-cyan-400">Status Distribution</h2>
                    <PieChartComponent data={data?.pie_chart} />
                  </div>
                </TabsContent>

                <TabsContent value="time" className="mt-0">
                  <div className="border border-neutral-800 rounded-2xl shadow-[0_0_15px_rgba(0,149,255,0.1)] backdrop-blur-sm bg-neutral-950/70 p-6">
                    <h2 className="text-xl font-bold mb-6 text-center text-cyan-400">Time Distribution</h2>
                    <Barchart data={data?.bar_chart} />
                  </div>
                </TabsContent>

                <TabsContent value="scores" className="mt-0">
                  <div className="border border-neutral-800 rounded-2xl shadow-[0_0_15px_rgba(0,149,255,0.1)] backdrop-blur-sm bg-neutral-950/70 p-6">
                    <h2 className="text-xl font-bold mb-6 text-center text-cyan-400">Performance Metrics</h2>
                    <DeskScore data={data?.desk_scores} />
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {!data && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center text-neutral-500 border border-dashed border-neutral-800 rounded-xl p-10 w-full max-w-4xl backdrop-blur-sm bg-neutral-950/30"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-neutral-700" />
              </div>
              <p className="text-lg">No data available</p>
              <p className="text-sm text-neutral-600">Select a date range and generate a report to view analytics</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Report
