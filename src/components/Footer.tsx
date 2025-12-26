"use client";

import { siteConfig } from "@/config/site";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="text-2xl font-xanh">{siteConfig.name}</div>
        <div className="text-[10px] sm:text-sm font-mono text-muted">
          © {new Date().getFullYear()} {siteConfig.author.toUpperCase()}. BUILT WITH NEXT.JS & GSAP.
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-[10px] font-mono uppercase tracking-widest text-muted">
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Github className="w-3 h-3" />
            Star on GitHub
          </a>
          <span>Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>Status: {siteConfig.status}</span>
        </div>
      </div>
    </footer>
  );
}
