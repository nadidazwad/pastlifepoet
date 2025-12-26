"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/effects/Preloader";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show preloader on first visit in this session
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("preloaderShown");
    }
    return true;
  });

  useEffect(() => {
    if (!isLoading) {
      // Mark preloader as shown for this session
      sessionStorage.setItem("preloaderShown", "true");
      // Refresh ScrollTrigger after preloader is gone
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
