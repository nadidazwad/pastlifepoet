"use client";

import { projects } from "@/data/portfolio";
import { TextReveal } from "./effects/TextReveal";
import { ArrowUpRight, Plus } from "lucide-react";
import { useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "./ui/MagneticButton";

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const filteredProjects = useMemo(() => {
    const filtered = activeCategory === "All" 
      ? projects 
      : projects.filter((p) => p.category === activeCategory);
    
    return isExpanded ? filtered : filtered.slice(0, 6);
  }, [activeCategory, isExpanded]);

  const remainingCount = useMemo(() => {
    const totalFiltered = activeCategory === "All" 
      ? projects.length 
      : projects.filter((p) => p.category === activeCategory).length;
    return totalFiltered - filteredProjects.length;
  }, [activeCategory, filteredProjects.length]);

  useGSAP(() => {
    const items = gsap.utils.toArray(".project-item");
    gsap.fromTo(items, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        overwrite: "auto"
      }
    );
  }, { scope: containerRef, dependencies: [filteredProjects] });

  return (
    <section id="work" ref={containerRef} className="py-16 md:py-24 px-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-widest text-muted mb-4">
            02 / Selected Work
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-xanh">Featured Projects</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted border-border hover:border-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-20">
        {filteredProjects.map((project, index) => (
          <div 
            key={project.slug} 
            className={`project-item group cursor-pointer ${
              project.featured ? "md:col-span-2" : "md:col-span-1"
            }`}
          >
            <div className={`relative overflow-hidden bg-muted/10 mb-6 ${
              project.featured ? "aspect-[16/7]" : "aspect-[4/5] md:aspect-[4/5]"
            }`}>
              <div className="absolute inset-0 flex items-center justify-center text-muted/20 font-xanh text-6xl sm:text-8xl md:text-9xl uppercase select-none group-hover:scale-105 transition-transform duration-1000 ease-out">
                {project.title.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
              <div className="absolute top-4 right-4 md:top-8 md:right-8 p-3 md:p-4 bg-background rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              
              {/* Tech Stack Badges */}
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 delay-75">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-background/80 backdrop-blur-sm text-[10px] font-mono uppercase tracking-tight rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-2xl md:text-3xl font-xanh mb-2">{project.title}</h4>
                <p className="text-xs md:text-sm text-muted uppercase tracking-widest">
                  {project.category} — {project.year}
                </p>
              </div>
              <div className="text-xs font-mono text-muted/50 pt-2">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {remainingCount > 0 && (
        <div className="mt-20 flex justify-center">
          <MagneticButton onClick={() => setIsExpanded(true)}>
            <div className="flex items-center gap-2 px-8 py-4">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-mono uppercase tracking-widest">
                Show {remainingCount} More Projects
              </span>
            </div>
          </MagneticButton>
        </div>
      )}
    </section>
  );
}

