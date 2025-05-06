"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import api from "@/lib/api";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
const TimeLine = () => {
  type TimelineData = {
    time: string;
    idle: number;
    working: number;
    empty: number;
  };
  const [timeline, setimeline] = useState<TimelineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimeLine = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("stream/realtime-data/?action=analytics", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log(res.data.timeline);
        setimeline(res.data.timeline);
      } catch (error) {
        console.error("Error fetching video stream:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeLine();
  }, []);
  const localTime = parseInt(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: false,
    })
  );

  return (
    <div>
      <div className="mt-2 px-6 pb-2">
        <div className="relative h-10 w-full border-t border-gray-600">
          <div className="absolute inset-[-7px] flex justify-between text-xs text-white w-full">
            {!isLoading ? (
              <>
                {timeline?.map((item) => {
                  const hourNum = parseInt(item.time.split(":")[0]);
                  const hour =
                    hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
                  const suffix = hourNum < 12 ? "AM" : "PM";

                  return (
                    <div
                      key={item.time}
                      className="flex flex-col items-center"
                      style={{ width: `${100 / timeline.length}%` }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="whitespace-nowrap cursor-pointer flex flex-col items-center">
                            {hourNum < localTime ? (
                              <div className="h-[12px] rounded-full w-[12px] bg-red-500 mb-1"></div>
                            ) : hourNum === localTime ? (
                              <div className="h-[12px] w-[12px] bg-green-500 rounded-full mb-1 animate-bounce"></div>
                            ) : (
                              <div className="h-[12px] rounded-full w-[12px] bg-orange-500 mb-1"></div>
                            )}

                            <div>
                              {hour} {suffix}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex flex-col items-start space-y-1">
                              <p className="text-sm font-medium">
                                Time: {hour} {suffix}
                              </p>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-700">
                                  Idle:
                                </span>
                                <span className="text-xs font-semibold text-blue-500">
                                  {item.idle}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-700">
                                  Working:
                                </span>
                                <span className="text-xs font-semibold text-green-500">
                                  {item.working}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-700">
                                  Empty:
                                </span>
                                <span className="text-xs font-semibold text-red-500">
                                  {item.empty}
                                </span>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                <Loader className="animate-spin" size={24} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;

// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { Loader, Clock, AlertTriangle } from 'lucide-react'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"
// import api from "@/lib/api"

// type TimelineData = {
//   time: string
//   idle: number
//   working: number
//   empty: number
// }

// const TimeLine = () => {
//   const [timeline, setTimeline] = useState<TimelineData[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchTimeLine = async () => {
//       try {
//         setIsLoading(true)
//         setError(null)
//         const res = await api.get("stream/realtime-data/?action=analytics", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         })
//         setTimeline(res.data.timeline)
//       } catch (error) {
//         console.error("Error fetching timeline data:", error)
//         setError("Failed to load timeline data")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchTimeLine()
//   }, [])

//   const localTime = parseInt(
//     new Date().toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       hour12: true,
//     })
//   )

//   // Calculate max values for scaling
//   const maxIdle = Math.max(...(timeline?.map(item => item.idle) || [0]), 1)
//   const maxWorking = Math.max(...(timeline?.map(item => item.working) || [0]), 1)
//   const maxEmpty = Math.max(...(timeline?.map(item => item.empty) || [0]), 1)

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-sm shadow-[0_0_15px_rgba(0,149,255,0.1)] p-4"
//     >
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center space-x-2">
//           <Clock className="h-4 w-4 text-cyan-400" />
//           <h3 className="text-sm font-medium text-white">TEMPORAL ANALYSIS</h3>
//         </div>

//         <div className="flex items-center space-x-4 text-xs text-neutral-400">
//           <div className="flex items-center space-x-1">
//             <div className="h-2 w-2 rounded-full bg-green-500"></div>
//             <span>Working</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
//             <span>Idle</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <div className="h-2 w-2 rounded-full bg-red-500"></div>
//             <span>Empty</span>
//           </div>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex items-center justify-center h-24 text-neutral-500">
//           <Loader className="animate-spin mr-2" size={16} />
//           <span className="text-sm">Loading timeline data...</span>
//         </div>
//       ) : error ? (
//         <div className="flex items-center justify-center h-24 text-red-400">
//           <AlertTriangle className="mr-2" size={16} />
//           <span className="text-sm">{error}</span>
//         </div>
//       ) : (
//         <div className="relative">
//           {/* Timeline track */}
//           <div className="relative h-[100px] w-full border-t border-neutral-700">
//             {/* Horizontal grid lines */}
//             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
//               <div className="border-b border-dashed border-neutral-800/50 h-1/3"></div>
//               <div className="border-b border-dashed border-neutral-800/50 h-1/3"></div>
//             </div>

//             {/* Time markers */}
//             <div className="absolute inset-0 flex justify-between">
//               {timeline?.map((item, index) => {
//                 const hourNum = parseInt(item.time.split(":")[0])
//                 const hour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum
//                 const suffix = hourNum < 12 ? "AM" : "PM"

//                 // Calculate status for visual indicator
//                 const status = hourNum < localTime ? "past" : hourNum === localTime ? "current" : "future"

//                 return (
//                   <div
//                     key={item.time}
//                     className="flex flex-col items-center relative"
//                     style={{ width: `${100 / timeline.length}%` }}
//                   >
//                     {/* Data visualization bars */}
//                     <div className="absolute bottom-6 w-full flex justify-center space-x-1 px-1">
//                       <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: `${(item.working / maxWorking) * 60}px` }}
//                         transition={{ duration: 0.5, delay: 0.1 * index }}
//                         className="w-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm"
//                         style={{
//                           minHeight: item.working > 0 ? '2px' : '0',
//                           opacity: status === "future" ? 0.5 : 1
//                         }}
//                       />
//                       <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: `${(item.idle / maxIdle) * 60}px` }}
//                         transition={{ duration: 0.5, delay: 0.1 * index + 0.05 }}
//                         className="w-1 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-sm"
//                         style={{
//                           minHeight: item.idle > 0 ? '2px' : '0',
//                           opacity: status === "future" ? 0.5 : 1
//                         }}
//                       />
//                       <motion.div
//                         initial={{ height: 0 }}
//                         animate={{ height: `${(item.empty / maxEmpty) * 60}px` }}
//                         transition={{ duration: 0.5, delay: 0.1 * index + 0.1 }}
//                         className="w-1 bg-gradient-to-t from-red-600 to-red-400 rounded-t-sm"
//                         style={{
//                           minHeight: item.empty > 0 ? '2px' : '0',
//                           opacity: status === "future" ? 0.5 : 1
//                         }}
//                       />
//                     </div>

//                     {/* Time marker with tooltip */}
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger className="absolute bottom-0 transform translate-y-1/2 whitespace-nowrap cursor-pointer flex flex-col items-center">
//                           <motion.div
//                             initial={{ scale: 0.8, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             transition={{ duration: 0.3, delay: 0.1 * index }}
//                             className={`h-3 w-3 rounded-full mb-1 ${
//                               status === "past"
//                                 ? "bg-red-500"
//                                 : status === "current"
//                                   ? "bg-green-500 animate-pulse"
//                                   : "bg-yellow-500"
//                             }`}
//                           />
//                           <div className="text-xs text-neutral-400 font-mono mt-1">
//                             {hour} {suffix}
//                           </div>
//                         </TooltipTrigger>
//                         <TooltipContent
//                           side="top"
//                           className="bg-neutral-900 border border-neutral-700 shadow-[0_0_10px_rgba(0,149,255,0.2)]"
//                         >
//                           <div className="flex flex-col items-start space-y-2 p-1">
//                             <p className="text-sm font-medium text-white border-b border-neutral-800 pb-1 w-full">
//                               {hour} {suffix}
//                             </p>
//                             <div className="grid grid-cols-3 gap-3 w-full">
//                               <div className="flex flex-col items-center">
//                                 <span className="text-xs text-neutral-400">Idle</span>
//                                 <span className="text-sm font-semibold text-yellow-400">{item.idle}</span>
//                               </div>
//                               <div className="flex flex-col items-center">
//                                 <span className="text-xs text-neutral-400">Working</span>
//                                 <span className="text-sm font-semibold text-green-500">{item.working}</span>
//                               </div>
//                               <div className="flex flex-col items-center">
//                                 <span className="text-xs text-neutral-400">Empty</span>
//                                 <span className="text-sm font-semibold text-red-500">{item.empty}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   )
// }

// export default TimeLine
