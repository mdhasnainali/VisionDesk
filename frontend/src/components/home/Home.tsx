"use client";

import { Camera, LogOutIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Profile from "../Profile/Profile";
import BorderGlow from "../ui/BorderGlow";
import { Button } from "../ui/button";

export function HeroSectionOne() {
  return (
    <div className="relative mx-auto  flex  flex-col items-center justify-center">
      <Navbar />
      <BorderGlow />
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Know Who's Working — In Real Time".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal  dark:text-neutral-400   text-neutral-400 "
        >
          VisionDesk AI uses advanced computer vision to detect if an employee
          is actively present and working at their desk.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={"/dashboard"}>
            <button className="w-60 transform rounded-lg bg-black px-6 py-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white font-semibold dark:hover:bg-gray-200 cursor-pointer  bg-gradient-to-r from-cyan-400 to-blue-500 ">
              Live Video
            </button>
          </Link>
          <Link href={"/dashboard/all-desk"}>
            <button className="w-60 transform rounded-lg border border-gray-300 cursor-pointer font-semibold backdrop-blur-2xl px-6 py-2  text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700  dark:text-white dark:hover:bg-gray-900">
              All Desks
            </button>
          </Link>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-20 rounded-3xl border border-dashed border-gray-300 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-black"
        >
          <div className="grid grid-cols-2 gap-4 w-full container">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-full overflow-hidden rounded-xl border 
            
                   border-cyan-500 shadow-[0_0_20px_#3400f999]  transition-transform duration-300"
                 
                }`}
              >
                <video
                  src={`/video/v${num}.mp4`}
                  title={`Video ${num}`}
                  className="w-full h-full rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export const Navbar = () => {
  const router = useRouter();
  const isLogin =
    typeof window !== "undefined" &&
    !!localStorage.getItem("access_token") &&
    !!localStorage.getItem("refresh_token");
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <Link href={"/"} className="flex items-center gap-2">
        <div className="size-7 flex items-center justify-center p-2 box-content rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
          <Camera color="white" />
        </div>
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 pb-2">
          VisionDesk AI
        </h1>
      </Link>
      {!isLogin ? (
        <Link href={"/auth/login"}>
          <button className="inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 cursor-pointer font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            Login
          </button>
        </Link>
      ) : (
        <>
          <div className="hidden md:flex items-center gap-4">
            <Profile />
            <Button
              onClick={() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                router.push("/auth/login");
              }}
              className="transform rounded-lg bg-black px-6 py-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white font-semibold dark:hover:bg-gray-200 cursor-pointer  bg-gradient-to-r from-cyan-400 to-blue-500 "
            >
              <LogOutIcon className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </>
      )}
    </nav>
  );
};
