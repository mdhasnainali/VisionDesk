"use client"

import { motion } from "framer-motion"

const DeskScore = ({ data }: { data: any }) => {
  // Sort desks by score in descending order
  const sortedDesks = Object.entries(data || {})
    .map(([deskId, score]) => ({ deskId, score: Number(score) }))
    .sort((a, b) => b.score - a.score)

  // Find max score for percentage calculations
  const maxScore = sortedDesks.length > 0 ? sortedDesks[0].score : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="space-y-6">
        {/* Top performers */}
        {sortedDesks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {sortedDesks.slice(0, 3).map((desk, index) => (
              <motion.div
                key={desk.deskId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl border ${
                  index === 0
                    ? "border-yellow-500/30 bg-gradient-to-b from-yellow-950/30 to-neutral-900/80"
                    : index === 1
                      ? "border-neutral-400/30 bg-gradient-to-b from-neutral-800/30 to-neutral-900/80"
                      : "border-amber-800/30 bg-gradient-to-b from-amber-950/30 to-neutral-900/80"
                } p-6 text-center`}
              >
                <div
                  className={`absolute top-0 right-0 w-16 h-16 ${
                    index === 0 ? "bg-yellow-500" : index === 1 ? "bg-neutral-400" : "bg-amber-700"
                  } rotate-45 translate-x-8 -translate-y-8`}
                ></div>

                <div className="text-sm font-medium mb-2 text-neutral-400">
                  {index === 0 ? "TOP PERFORMER" : index === 1 ? "RUNNER UP" : "THIRD PLACE"}
                </div>

                <div className="text-xl font-bold mb-1">Desk {desk.deskId}</div>

                <div
                  className={`text-3xl font-bold ${
                    index === 0 ? "text-yellow-400" : index === 1 ? "text-neutral-300" : "text-amber-600"
                  }`}
                >
                  {desk.score.toFixed(2)}
                </div>

                <div className="mt-3 w-full bg-neutral-800/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(desk.score / maxScore) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-2 rounded-full ${
                      index === 0 ? "bg-yellow-400" : index === 1 ? "bg-neutral-300" : "bg-amber-600"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* All desks leaderboard */}
        <div className="space-y-3">
          {sortedDesks.map((desk, index) => (
            <motion.div
              key={desk.deskId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center bg-neutral-900/50 border border-neutral-800 rounded-lg p-4 hover:border-cyan-900/50 hover:bg-neutral-800/50 transition-all duration-300"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 mr-4">
                <span className="text-sm font-medium">{index + 1}</span>
              </div>

              <div className="flex-1">
                <div className="font-medium">Desk {desk.deskId}</div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(desk.score / maxScore) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`h-1.5 rounded-full ${
                      index === 0
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                        : index === 1
                          ? "bg-gradient-to-r from-neutral-300 to-neutral-400"
                          : index === 2
                            ? "bg-gradient-to-r from-amber-600 to-amber-700"
                            : "bg-gradient-to-r from-cyan-500 to-blue-600"
                    }`}
                  />
                </div>
              </div>

              <div className="text-xl font-bold ml-4">{desk.score.toFixed(2)}</div>
            </motion.div>
          ))}
        </div>

        {sortedDesks.length === 0 && (
          <div className="text-center text-neutral-500 border border-dashed border-neutral-800 rounded-xl p-10">
            <p>No desk score data available for the selected period.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default DeskScore
