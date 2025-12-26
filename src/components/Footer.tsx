"use client";

import { siteConfig } from "@/config/site";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 md:py-16 px-6 md:px-12 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
        <div className="text-xl md:text-2xl font-xanh">{siteConfig.name}</div>
        <div className="text-xs sm:text-sm font-mono text-muted order-last md:order-none">
          © {new Date().getFullYear()} {siteConfig.author.toUpperCase()}. BUILT WITH NEXT.JS & GSAP.
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-6 text-xs font-mono uppercase tracking-widest text-muted">
          <a 
            href={siteConfig.links.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-3 min-h-[44px] flex items-center gap-2 hover:text-foreground active:text-foreground/70 transition-colors focus-ring rounded-lg"
          >
            <Github className="w-4 h-4" />
            Star on GitHub
          </a>
          <span className="py-2">Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="py-2">Status: {siteConfig.status}</span>
        </div>
      </div>
    </footer>
  );
}
