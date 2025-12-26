"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Github, ExternalLink, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useEffect } from "react";

interface SourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SourceModal({ isOpen, onClose }: SourceModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-background/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-border"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-muted/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-12">
                <div className="mb-8">
                  <h2 className="text-sm font-mono uppercase tracking-widest text-muted mb-2">
                    Open Source Project
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-xanh">Clone & Create</h3>
                </div>

                <div className="space-y-6 md:space-y-8">
                  {/* Info Card */}
                  <div className="p-5 md:p-6 bg-muted/5 rounded-2xl border border-border">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-xs font-mono uppercase text-muted">License: MIT</span>
                      <div className="text-right">
                        <span className="text-3xl md:text-4xl font-xanh">FREE</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {[
                        "Full Next.js 16 Source Code",
                        "GSAP & Motion Animations",
                        "Lenis Smooth Scroll Setup",
                        "Responsive Design System",
                        "Community Driven",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Details */}
                  <div className="space-y-4">
                    <div className="p-4 bg-foreground text-background rounded-xl font-mono text-xs flex items-center justify-between group cursor-pointer" onClick={() => navigator.clipboard.writeText(`git clone ${siteConfig.links.github}.git`)}>
                      <div className="flex items-center gap-3">
                        <Terminal className="w-4 h-4 opacity-50" />
                        <span>git clone {siteConfig.links.github.split('/').pop()}.git</span>
                      </div>
                      <span className="opacity-30 group-hover:opacity-100 transition-opacity">Copy</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <a 
                        href={siteConfig.links.github}
                        target="_blank"
                        className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-foreground transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Github className="w-5 h-5 text-muted group-hover:text-foreground transition-colors" />
                          <span className="font-mono text-xs md:text-sm">View on GitHub</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted/40 group-hover:text-foreground" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-border text-center">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted/40">
                    Star the repo if you find it useful
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
