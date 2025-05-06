"use client";

import type React from "react";

import { format } from "date-fns";
import {
  CalendarIcon,
  Loader2,
  Thermometer,
  ZoomIn,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Heatmap = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Simulated loading effect for futuristic feel
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setLoadingProgress(0);
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const FromDate = fromDate ? format(fromDate, "yyyy-MM-dd") : null;
    const ToDate = toDate ? format(toDate, "yyyy-MM-dd") : null;

    if (!FromDate || !ToDate) {
      toast.error("Please select both From and To dates.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(
        `administrator/report/?type=heatmap&start=${FromDate}&end=${ToDate}`,
        {
          responseType: "blob",
        }
      );
      const imageBlob = res.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectURL);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to fetch heatmap. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `heatmap-${format(
      fromDate || new Date(),
      "yyyy-MM-dd"
    )}-to-${format(toDate || new Date(), "yyyy-MM-dd")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            THERMAL ANALYSIS
          </h1>
          <p className="text-center text-neutral-400 text-sm mb-8">
            SPATIAL DISTRIBUTION VISUALIZATION
          </p>
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
                <label className="block text-sm font-medium mb-2 text-neutral-300">
                  FROM DATE
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800/70 hover:border-blue-500/50 transition-all duration-300",
                        !fromDate && "text-neutral-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-cyan-400" />
                      {fromDate ? (
                        format(fromDate, "PPP")
                      ) : (
                        <span>Select start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 border-neutral-700 bg-neutral-900"
                    align="start"
                  >
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
                <label className="block text-sm font-medium mb-2 text-neutral-300">
                  TO DATE
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800/70 hover:border-blue-500/50 transition-all duration-300",
                        !toDate && "text-neutral-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-cyan-400" />
                      {toDate ? (
                        format(toDate, "PPP")
                      ) : (
                        <span>Select end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 border-neutral-700 bg-neutral-900"
                    align="start"
                  >
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
                    <Thermometer className="mr-2 h-5 w-5" />
                    <span className="text-lg">GENERATE HEATMAP</span>
                  </>
                )}
              </span>
              {loading && (
                <span
                  className="absolute bottom-0 left-0 h-1 bg-cyan-300"
                  style={{
                    width: `${loadingProgress}%`,
                    transition: "width 0.2s ease-out",
                  }}
                />
              )}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-cyan-400/30 to-blue-600/0 -translate-x-full group-hover:animate-shimmer" />
            </Button>
          </form>
        </motion.div>

        <AnimatePresence>
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl"
            >
              <div className="border border-neutral-800 rounded-2xl shadow-[0_0_15px_rgba(0,149,255,0.1)] backdrop-blur-sm bg-neutral-950/70 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-cyan-400">
                    Heatmap Visualization
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setZoomed(!zoomed)}
                      className="border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 hover:border-cyan-500/50"
                    >
                      <ZoomIn className="h-4 w-4 text-cyan-400" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={downloadImage}
                      className="border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 hover:border-cyan-500/50"
                    >
                      <Download className="h-4 w-4 text-cyan-400" />
                    </Button>
                  </div>
                </div>

                <div
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setZoomed(!zoomed)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-blue-600/5 rounded-lg blur-xl opacity-30"></div>
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt="Heatmap Visualization"
                    width={1000}
                    height={500}
                    className={`rounded-lg shadow-lg border border-neutral-800 transition-all duration-500 ${
                      zoomed ? "scale-150 transform-origin-center" : "scale-100"
                    }`}
                  />
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div className="col-span-4 md:col-span-2 bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
                    <div className="text-xs text-neutral-400 uppercase">
                      Date Range
                    </div>
                    <div className="text-sm font-medium mt-1">
                      {fromDate && toDate
                        ? `${format(fromDate, "MMM dd, yyyy")} - ${format(
                            toDate,
                            "MMM dd, yyyy"
                          )}`
                        : "No date range selected"}
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1 bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
                    <div className="text-xs text-neutral-400 uppercase">
                      Total Days
                    </div>
                    <div className="text-sm font-medium mt-1">
                      {fromDate && toDate
                        ? Math.ceil(
                            (toDate.getTime() - fromDate.getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) + 1
                        : "-"}
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1 bg-neutral-900/50 border border-neutral-800 rounded-lg p-3">
                    <div className="text-xs text-neutral-400 uppercase">
                      Generated
                    </div>
                    <div className="text-sm font-medium mt-1">
                      {format(new Date(), "MMM dd, HH:mm")}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-neutral-500">
                  <p>
                    Click on the image to zoom in/out. Use the download button
                    to save the heatmap for offline analysis.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!imageUrl && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center text-neutral-500 border border-dashed border-neutral-800 rounded-xl p-10 w-full max-w-4xl backdrop-blur-sm bg-neutral-950/30"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center">
                <Thermometer className="h-8 w-8 text-neutral-700" />
              </div>
              <p className="text-lg">No heatmap to display</p>
              <p className="text-sm text-neutral-600">
                Select a date range and generate a heatmap to visualize data
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Heatmap;
