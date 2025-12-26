"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface ImageZoomProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageZoom({ src, alt, caption }: ImageZoomProps) {
  return (
    <figure className="my-12 group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="relative aspect-video overflow-hidden rounded-2xl bg-muted/10 border border-border cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>
      {caption && (
        <figcaption className="mt-4 text-center text-xs font-mono text-muted uppercase tracking-widest">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
