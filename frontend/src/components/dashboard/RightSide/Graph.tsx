"use client";

import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

export default function Graph({ deskData }: any) {
  const canvasEl: any = useRef(null);
  const colors = {
    blue: {
      default: "rgba(54, 162, 235, 1)",
      half: "rgba(54, 162, 235, 0.5)",
      quarter: "rgba(54, 162, 235, 0.25)",
      zero: "rgba(54, 162, 235, 0)",
    },
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d") as any;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colors.blue.half);
    gradient.addColorStop(0.65, colors.blue.quarter);
    gradient.addColorStop(1, colors.blue.zero);

    const times1 = ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];
    const twiddleData = ["IDLE", "WORKING", "EMPTY", "IDLE", "WORKING", "EMPTY", "IDLE"];

    const data = {
      labels: deskData?.labels || times1, // X-axis (time)
      datasets: [
        {
          backgroundColor: gradient,
          label: "Working (units)",
          data: deskData?.status || twiddleData,
          fill: true,
          borderWidth: 2,
          borderColor: colors.blue.default,
          lineTension: 0.3,
          pointBackgroundColor: colors.blue.default,
          pointRadius: 4,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          x: {
            type: "category",
            title: { display: true, text: "Time" },
          },
          y: {
            type: "category",
            labels: ["WORKING", "IDLE","EMPTY"], 
            title: { display: true, text: "Status" },
          },
        },
      },
    };

    const myLineChart = new Chart(ctx, config as any);

    return () => {
      myLineChart.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full shadow-md rounded-lg flex flex-col items-center justify-center">
      <canvas ref={canvasEl} height="100" />
    </div>
  );
}
