"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  // Handle Escape key to close mobile menu
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isMenuOpen) {
      setIsMenuOpen(false);
      menuTriggerRef.current?.focus();
    }
  }, [isMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;
    
    document.addEventListener("keydown", handleEscapeKey);
    
    // Focus trap logic
    const menuElement = mobileMenuRef.current;
    if (!menuElement) return;
    
    const focusableElements = menuElement.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    // Focus the first element when menu opens
    setTimeout(() => firstFocusable?.focus(), 100);
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    };
    
    document.addEventListener("keydown", handleTabKey);
    
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isMenuOpen, handleEscapeKey]);

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
      <div className="flex md:hidden items-center gap-2 px-3 py-2 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-sm">
        <button
          ref={menuTriggerRef}
          onClick={() => setIsMenuOpen(true)}
          className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground rounded-full focus-ring active:bg-foreground/10 transition-colors"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="w-[1px] h-6 bg-border" />

        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground rounded-full focus-ring active:bg-foreground/10 transition-colors"
          aria-label="View source code"
        >
          <Github className="w-5 h-5" />
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[150] bg-background flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-xanh tracking-tighter">{siteConfig.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-foreground rounded-full focus-ring active:bg-foreground/10 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center text-foreground rounded-full focus-ring active:bg-foreground/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    "text-4xl sm:text-5xl font-xanh uppercase text-left py-2 transition-colors focus-ring rounded-lg active:opacity-70",
                    activeSection === item.href.substring(1) ? "text-foreground" : "text-foreground/30"
                  )}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-border">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full min-h-[56px] py-5 bg-foreground text-background rounded-2xl text-lg font-mono uppercase tracking-widest flex items-center justify-center gap-3 focus-ring active:opacity-90 transition-opacity"
              >
                <Github className="w-5 h-5" />
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
