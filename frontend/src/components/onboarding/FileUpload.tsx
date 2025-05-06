"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { motion } from "framer-motion";
import { useState } from "react";

const FileUploadSection = () => {
  const [, setImageFile] = useState<File | null>(null);
  const handleFileUpload = (files: File[]) => {
    // console.log(files);
    setImageFile(files[0]);
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
            Onboarding Process
          </h1>
          <p className="text-center text-neutral-400 text-sm mb-8">
            Step-1 : Upload Image
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full border-dashed max-w-4xl border border-neutral-800 rounded-2xl shadow-[0_0_15px_rgba(0,149,255,0.15)] backdrop-blur-sm bg-neutral-950/70 p-8"
        >
          <div className="w-full h-full  bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
            <div className="flex flex-col items-center justify-center w-full h-full p-4"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FileUploadSection;
