"use client";

import { useState } from "react";
import { AllChartSlides } from "./AllChartSlides";

const Analytics = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  return (
    <div className="flex w-full items-center justify-center pb-2">
      {/* Button */}
      <button
        onClick={() => setShowAnalytics(!showAnalytics)}
        className="inline-flex h-12 cursor-pointer mb-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        {showAnalytics ? "Hide Analytics" : "Show Analytics"}
      </button>
      {/* Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20  transition-opacity">
          <div className="relative w-11/12 max-w-4xl rounded-xl border border-slate-700 bg-black/60 p-4 shadow-2xl">
            <button
              onClick={() => setShowAnalytics(false)}
              className="absolute top-3 right-3 text-white hover:text-red-500 text-xl cursor-pointer"
            >
              ✕
            </button>
            {/* All Chart Slides */}
            <AllChartSlides />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
