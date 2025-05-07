"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Camera, Maximize2, Minimize2, RefreshCw, Video, FileVideo } from "lucide-react";

import { Button } from "@/components/ui/button";
import TimeLine from "./TimeLine";
import Analytics from "./Analytics";

const VideoSection = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streamSource, setStreamSource] = useState("demo");
  const [isLoading, setIsLoading] = useState(false);

  // Form state for RTSP configuration
  const [rtspConfig, setRtspConfig] = useState({
    cctv: false,
    ip: "",
    user: "admin",
    password: "",
    port: "554",
    video_path: "/path/to/default/video.mp4",
    switch_model: false
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "cctv" or "demo"

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshStream = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const openCCTVModal = () => {
    setModalType("cctv");
    setShowModal(true);
  };

  const openDemoModal = () => {
    setModalType("demo");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRtspConfig({
      ...rtspConfig,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitRTSPConfig = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const config = {
        ...rtspConfig,
      };

      // Set appropriate values based on modal type
      if (modalType === "cctv") {
        config.cctv = true;
        config.video_path = null;
      } else {
        config.cctv = false;
        config.ip = null;
        config.password = null;
      }

      const response = await fetch("http://localhost:80/rtsp/control", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      const data = await response.json();
      
      // Update stream source indicator
      setStreamSource(modalType === "cctv" ? "cctv" : "demo");
      
      // Close modal
      closeModal();
      
      // Show notification (you might want to implement a notification system)
      console.log(data.message);
    } catch (error) {
      console.error("Error controlling stream:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-neutral-950 text-white">
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
            Live Video Feed
          </h1>
          <p className="text-center text-neutral-400 text-sm mb-4">
            This section displays the live video feed from the main camera. The
            feed is updated in real-time, and you can toggle fullscreen mode or
            refresh the stream as needed. The system is designed to provide a
            secure and efficient monitoring experience.
          </p>
          
          {/* Control buttons */}
          <div className="flex justify-center space-x-4 my-4">
            <Button
              onClick={openCCTVModal}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-none px-6 py-2 rounded-lg flex items-center space-x-2"
            >
              <Camera className="h-4 w-4" />
              <span>Connect to CCTV</span>
            </Button>
            
            <Button
              onClick={openDemoModal}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none px-6 py-2 rounded-lg flex items-center space-x-2"
            >
              <FileVideo className="h-4 w-4" />
              <span>Load Demo Video</span>
            </Button>
          </div>
          
          {/* Current source indicator */}
          <div className="flex justify-center items-center space-x-2 mb-2">
            <div className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full border border-neutral-800">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-white">SOURCE: {streamSource.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <section className="relative w-full max-w-5xl bg-black/70 backdrop-blur-sm border border-neutral-800 rounded-3xl shadow-[0_0_20px_rgba(0,149,255,0.15)] p-4">
          <div className="relative">
            {/* Video container with futuristic styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden border border-dashed border-neutral-800 shadow-[0_0_20px_rgba(0,149,255,0.15)] ${
                isFullscreen ? "fixed inset-0 z-50 m-4" : "aspect-video w-full"
              }`}
            >
              {/* Overlay grid pattern */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              </div>

              {/* Video feed */}
              <div className="relative w-full h-full bg-black">
                <motion.div
                  animate={{ opacity: isRefreshing ? 0.5 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}stream/realtime-data/?action=stream`}
                    alt="Video Stream"
                    className="w-full h-full object-cover rounded-b-[2.9rem]"
                  />
                </motion.div>

                {/* Scanning line effect */}
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "linear",
                  }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-20 pointer-events-none"
                />

                {/* Camera info overlay */}
                <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-4 z-30">
                  <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-neutral-800">
                    <Camera className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs font-mono text-white">
                      MAIN_FEED::01
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-black/70 backdrop-blur-sm border-neutral-800 hover:bg-black/90 hover:border-cyan-900"
                      onClick={refreshStream}
                    >
                      <RefreshCw
                        className={`h-4 w-4 text-cyan-400 ${
                          isRefreshing ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-black/70 backdrop-blur-sm border-neutral-800 hover:bg-black/90 hover:border-cyan-900"
                      onClick={toggleFullscreen}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-4 w-4 text-cyan-400" />
                      ) : (
                        <Maximize2 className="h-4 w-4 text-cyan-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm border-t border-neutral-800 flex justify-between items-center px-4 py-2 z-30">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-mono text-white">LIVE</span>
                    </div>
                    <div className="text-xs font-mono text-neutral-400">
                      {formattedDate}
                    </div>
                  </div>

                  <div className="text-sm font-mono text-cyan-400">
                    {formattedTime}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-mono text-white">SECURE</span>
                  </div>
                </div>

                {/* Scanning effect */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-30"></div>
                  <div className="absolute inset-0 border border-cyan-500/10 rounded-3xl"></div>
                </div>
              </div>
            </motion.div>
          </div>
          {/* Timeline */}
          <TimeLine />
          <Analytics />
        </section>
      </div>
      
      {/* Modal for RTSP Configuration */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-lg p-6 shadow-[0_0_30px_rgba(0,149,255,0.2)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {modalType === "cctv" ? "Connect to CCTV Camera" : "Load Demo Video"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="h-8 w-8 rounded-full hover:bg-neutral-800"
              >
                <span className="text-neutral-400">×</span>
              </Button>
            </div>
            
            <form onSubmit={submitRTSPConfig}>
              {modalType === "cctv" ? (
                <>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">
                          IP Address
                        </label>
                        <input
                          type="text"
                          name="ip"
                          value={rtspConfig.ip}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          placeholder="192.168.1.100"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">
                          Port
                        </label>
                        <input
                          type="text"
                          name="port"
                          value={rtspConfig.port}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          placeholder="554"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          name="user"
                          value={rtspConfig.user}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          placeholder="admin"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={rtspConfig.password}
                          onChange={handleInputChange}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          placeholder="●●●●●●"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-1">
                    Video Path
                  </label>
                  <input
                    type="text"
                    name="video_path"
                    value={rtspConfig.video_path}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    placeholder="/path/to/video.mp4"
                    required
                  />
                </div>
              )}
              
              {/* Switch Model Toggle - Available for both modal types */}
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="switch_model"
                    name="switch_model"
                    checked={rtspConfig.switch_model}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-neutral-700 text-cyan-500 focus:ring-cyan-500"
                  />
                  <label
                    htmlFor="switch_model"
                    className="text-sm font-medium text-neutral-300"
                  >
                    Switch to Alternative Model
                  </label>
                </div>
                <p className="text-xs text-neutral-500 mt-1 ml-6">
                  Use this option to toggle between different processing models
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 bg-neutral-800 hover:bg-neutral-700 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Apply Settings"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;