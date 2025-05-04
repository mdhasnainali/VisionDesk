import subprocess
import time
import os

def stream_video_loop(video_path, rtsp_url, resolution="640x480"):
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video not found: {video_path}")

    ffmpeg_cmd = [
        "ffmpeg",
        "-stream_loop", "-1",             # Loop infinitely
        "-re",                            # Read input at native frame rate
        "-i", video_path,
        "-vf", f"scale={resolution}",     # Scale to lower resolution
        "-c:v", "libx264",                # Use H.264 codec instead of copying
        "-preset", "ultrafast",           # Fast encoding
        "-tune", "zerolatency",           # Optimize for streaming
        "-b:v", "1000k",                  # Lower bitrate (1Mbps)
        "-maxrate", "1000k",              # Maximum bitrate
        "-bufsize", "2000k",              # Buffer size
        "-f", "rtsp",
        rtsp_url
    ]

    try:
        print(f"Starting RTSP stream at resolution {resolution}...")
        subprocess.run(ffmpeg_cmd)
    except KeyboardInterrupt:
        print("Stream interrupted.")

if __name__ == "__main__":
    video_file = "./../ai/videos/demo8.mp4"  # Replace with your video file
    # Use local IP instead of localhost to make it accessible on the network
    import socket
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    local_ip = s.getsockname()[0]
    s.close()
    
    rtsp_url = f"rtsp://{local_ip}:8554/mystream"
    print(f"Stream will be available at: {rtsp_url}")
    
    # You can change the resolution here (width x height)
    stream_video_loop(video_file, rtsp_url, resolution="640x360")