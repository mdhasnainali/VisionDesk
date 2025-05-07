import subprocess
import os
import subprocess
import signal


class StreamFFMPEG:
    def __init__(self, rtsp_url, resolution="640x480"):
        self.rtsp_url = rtsp_url
        self.resolution = resolution
        self.process = None
        self.mediamtx = subprocess.Popen(
            ['./streamer_dependency/mediamtx'])

    def stop_stream(self):
        if self.process is not None:
            os.kill(self.process.pid, signal.SIGTERM)
            self.process = None

    def start_stream(self, video_path):
        if self.process is not None:
            os.kill(self.process.pid, signal.SIGTERM)
        self.__stream(video_path)

    def __stream(self, video_path):
        if not os.path.exists(video_path):
            raise FileNotFoundError(f"Video not found: {video_path}")
        ffmpeg_cmd = [
            "ffmpeg",
            "-stream_loop", "-1",
            "-re",
            "-i", video_path,
            "-vf", f"scale={self.resolution}",
            "-c:v", "libx264",
            "-preset", "veryfast",             # Better quality than ultrafast
            "-tune", "zerolatency",
            "-b:v", "2500k",                   # Higher bitrate for better quality
            "-maxrate", "2500k",
            "-bufsize", "5000k",               # Increased buffer for smoother stream
            "-g", "25",
            "-keyint_min", "25",
            "-c:a", "aac",
            "-ar", "44100",
            "-f", "rtsp",
            self.rtsp_url
        ]

        try:
            print(f"Starting RTSP stream at resolution {self.resolution}...")
            self.process = subprocess.Popen(ffmpeg_cmd)
        except KeyboardInterrupt:
            print("Stream interrupted.")
