"use client";

import api from "@/lib/api";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { testimonials } from "../../../../contants";
import Graph from "./Graph";
import { Loader } from "lucide-react";

export const AllChartSlides = () => {
  const [active, setActive] = useState(0);
  const [deskData, setDeskData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeskData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(
          `stream/realtime-data/?action=desk-analytics&desk-no=${active}`
        );

        setDeskData(res?.data);
        console.log(res)
      } catch (error) {
        console.error("Error fetching video stream:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeskData();
  }, [active]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % deskData?.total);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + deskData?.total) % deskData?.total);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="mx-auto max-w-sm px-4 pt-20  md:max-w-4xl md:px-8 lg:px-12 bg-black/40 rounded-md">
      <div className="flex flex-col gap-10 items-center justify-center">
        {/* Chart Section */}

        <div className="relative w-full max-w-3xl h-72">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -80, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
              >
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-800">
                  {/* Graph */}
                  {isLoading ? (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-neutral-300">
                      <Loader className="animate-spin h-8 w-8" />
                    </div>
                  ) : (
                    <Graph deskData={deskData} />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text Content Section */}
        <div className="flex flex-col items-center text-center w-full px-4">
          {!isLoading ? (
            <>
              <motion.div
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <motion.p className="mt-2 text-lg text-gray-500 dark:text-neutral-300">
                  {"Desk number ".split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                  {active}
                </motion.p>
                <motion.p className="mt-2 text-lg text-gray-500 dark:text-neutral-300">
                  {"Detect Time ".split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                  {new Date(deskData?.desk_info?.created_at).toLocaleString()}
                </motion.p>
              </motion.div>
            </>
          ) : (
            <motion.p className="mt-2 text-lg text-gray-500 dark:text-neutral-300">
              <Loader className="animate-spin h-8 w-8" />
            </motion.p>
          )}
          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="group/button cursor-pointer flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button cursor-pointer flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
          {/* Total */}
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="text-sm">
              {active}/{deskData?.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
