"use client"
import Link from "next/link";
import { motion } from "framer-motion";
const Onboarding = () => {
  const data = [
    {
      id: 1,
      title: "Step 1: Upload Image",
      description: "Pick an image to upload and annotate.",
    },
    {
      id: 2,
      title: "Step 2: Annotate Image",
      description: "Use the annotation tools to mark up your image.",
    },
    {
      id: 3,
      title: "Step 3: Get Started",
      description: "Dashboard will be ready in a few seconds.",
    },
  ];
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
            Onboarding Process
          </h1>
          <p className="text-center text-neutral-400 text-sm mb-8">
            Follow these simple steps to get started with our platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full border-dashed max-w-4xl border border-neutral-800 rounded-2xl shadow-[0_0_15px_rgba(0,149,255,0.15)] backdrop-blur-sm bg-neutral-950/70 p-8"
        >
          <section className="flex flex-col items-center justify-center h-full p-4 bg-gray-50 dark:bg-black">
            <div className="space-y-8">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="border relative p-4 rounded-lg shadow-md "
                >
                  <div className="absolute animate-pulse inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  </div>
                  <div className="absolute animate-pulse inset-x-0 top-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  </div>
                  <div className=" space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={"/onboarding/file-upload"}>
              <button className="inline-flex mt-8 h-12 cursor-pointer animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Click to Start!
              </button>
            </Link>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;
