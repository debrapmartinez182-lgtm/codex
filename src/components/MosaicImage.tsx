"use client";

import { useRef, useEffect, useState } from "react";

interface MosaicImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  blockSize?: number;
}

export default function MosaicImage({
  src,
  alt = "",
  className = "",
  style,
  blockSize = 14,
}: MosaicImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  // Observe container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ w: Math.round(width), h: Math.round(height) });
        }
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Draw mosaic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.w === 0 || dimensions.h === 0) return;

    canvas.width = dimensions.w;
    canvas.height = dimensions.h;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Scale block size with image dimensions for consistent mosaic look
      const bs = Math.max(4, Math.floor(Math.min(dimensions.w, dimensions.h) / 20));
      const w = Math.max(1, Math.floor(canvas.width / bs));
      const h = Math.max(1, Math.floor(canvas.height / bs));
      ctx.drawImage(img, 0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    };
    img.onerror = () => setError(true);
    img.src = src;
  }, [src, dimensions]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500 ${className}`} style={style}>
        <span className="text-4xl opacity-60">📄</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`} style={style}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "pixelated" }}
        aria-label={alt}
      />
    </div>
  );
}
