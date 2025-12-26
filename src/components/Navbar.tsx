"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Github, Menu, X, Sun, Moon } from "lucide-react";
import { SourceModal } from "./effects/SourceModal";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Expertise", href: "#expertise" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const lenis = useLenis();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check if we're at the bottom of the page
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      
      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      // Simple intersection observer logic for active section
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    lenis?.scrollTo(href, { offset: -80 });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] flex justify-center transition-all duration-500 py-6",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      {/* Desktop Navigation */}
      <nav className="hidden md:flex relative items-center gap-1 px-2 py-2 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-sm">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <button
              key={item.name}
              onClick={() => scrollTo(item.href)}
              className={cn(
                "relative px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors duration-300 rounded-full",
                isActive ? "text-background" : "text-foreground/50 hover:text-foreground"
              )}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-foreground rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}

        <div className="w-[1px] h-4 bg-border mx-1" />

        <button
          onClick={toggleTheme}
          className="p-2 text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-widest bg-foreground text-background rounded-full hover:opacity-90 transition-all duration-300"
        >
          <Github className="w-3 h-3 transition-transform group-hover:scale-110" />
          <span>Source</span>
        </button>
      </nav>

      {/* Mobile Navigation Trigger */}
      <div className="flex md:hidden items-center gap-4 px-4 py-2 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-sm">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 text-foreground"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="w-[1px] h-4 bg-border" />

        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-foreground"
          aria-label="Open source"
        >
          <Github className="w-5 h-5" />
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[150] bg-background flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-xanh tracking-tighter">{siteConfig.name}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-foreground"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-foreground"
                  aria-label="Close menu"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    "text-5xl font-xanh uppercase text-left transition-colors",
                    activeSection === item.href.substring(1) ? "text-foreground" : "text-foreground/30"
                  )}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto pt-12 border-t border-border">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full py-6 bg-foreground text-background rounded-2xl text-xl font-mono uppercase tracking-widest flex items-center justify-center gap-4"
              >
                <Github className="w-6 h-6" />
                Clone Repository
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className={cn(
        "absolute left-6 md:left-12 top-1/2 -translate-y-1/2 transition-opacity duration-500 hidden md:block",
        isScrolled ? "opacity-100" : "opacity-0"
      )}>
        <span className="text-lg font-xanh tracking-tighter">{siteConfig.name}</span>
      </div>
    </header>
  );
}
