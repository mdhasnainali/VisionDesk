"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;

        // Random color from blue/purple palette
        const colors = [
          "rgba(79, 70, 229, 0.7)", // Indigo
          "rgba(139, 92, 246, 0.7)", // Purple
          "rgba(59, 130, 246, 0.7)", // Blue
          "rgba(147, 51, 234, 0.7)", // Violet
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(
      100,
      Math.floor((canvas.width * canvas.height) / 10000)
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect particles with lines if they're close enough
      connectParticles();

      requestAnimationFrame(animate);
    };

    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 150;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            // Opacity based on distance
            const opacity = 1 - distance / maxDistance;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  const { theme } = useTheme();
  return theme === "dark" ? (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-black"
      style={{
        background:
          "radial-gradient(circle at center, #0f172a 0%, #000000 100%)",
      }}
    />
  ) : null;
}
