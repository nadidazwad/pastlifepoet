import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Info, AlertCircle, Lightbulb, Link as LinkIcon, ExternalLink, ChevronRight } from "lucide-react";
import { ImageZoom } from "./ImageZoom";

export const MDXComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl md:text-5xl font-xanh mt-12 mb-6" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl md:text-3xl font-xanh mt-10 mb-4 flex items-center gap-3" {...props}>
      <span className="text-muted/30 text-sm font-mono">##</span>
      {props.children}
    </h2>
  ),
  h3: (props: any) => (
    <h3 className="text-xl md:text-2xl font-xanh mt-8 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="text-base md:text-lg text-muted leading-relaxed mb-6" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-none space-y-3 mb-8" {...props} />
  ),
  li: (props: any) => (
    <li className="flex items-start gap-3 text-muted" {...props}>
      <ChevronRight className="h-5 w-5 text-foreground/40 mt-1 shrink-0" />
      <span>{props.children}</span>
    </li>
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-foreground/20 pl-6 my-10 italic text-xl md:text-2xl font-xanh text-foreground/80" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-muted/10 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-muted/5 border border-border rounded-2xl p-6 my-8 overflow-x-auto font-mono text-sm" {...props} />
  ),
  
  Callout: ({ children, type = "info" }: { children: React.ReactNode, type?: "info" | "warning" | "tip" }) => {
    const icons = {
      info: <Info className="h-5 w-5" />,
      warning: <AlertCircle className="h-5 w-5" />,
      tip: <Lightbulb className="h-5 w-5" />,
    };
    
    const styles = {
      info: "bg-blue-500/5 border-blue-500/20 text-blue-200",
      warning: "bg-amber-500/5 border-amber-500/20 text-amber-200",
      tip: "bg-emerald-500/5 border-emerald-500/20 text-emerald-200",
    };

    return (
      <div className={`flex gap-4 p-6 rounded-2xl border my-8 ${styles[type]}`}>
        <div className="shrink-0 mt-1">{icons[type]}</div>
        <div className="text-sm md:text-base leading-relaxed">{children}</div>
      </div>
    );
  },

  TechStack: ({ techs }: { techs: string[] }) => (
    <div className="flex flex-wrap gap-2 my-8">
      {techs.map((tech) => (
        <span key={tech} className="px-4 py-1.5 bg-muted/10 border border-border rounded-full text-xs font-mono uppercase tracking-wider">
          {tech}
        </span>
      ))}
    </div>
  ),

  ImageZoom,

  Timeline: ({ items }: { items: { date: string, title: string, description: string }[] }) => (
    <div className="relative pl-8 my-12 space-y-12 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-border">
      {items.map((item, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full bg-foreground border-4 border-background" />
          <div className="text-xs font-mono text-muted uppercase tracking-widest mb-2">{item.date}</div>
          <h4 className="text-xl font-xanh mb-2">{item.title}</h4>
          <p className="text-muted text-sm leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  ),

  LinkCard: ({ href, title, description, external = true }: { href: string, title: string, description: string, external?: boolean }) => (
    <Link 
      href={href} 
      target={external ? "_blank" : undefined}
      className="block p-6 rounded-2xl border border-border bg-muted/5 hover:bg-muted/10 transition-all duration-300 my-8 group"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-xanh group-hover:text-foreground transition-colors">{title}</h4>
        {external ? <ExternalLink className="h-4 w-4 text-muted" /> : <LinkIcon className="h-4 w-4 text-muted" />}
      </div>
      <p className="text-sm text-muted leading-relaxed">{description}</p>
    </Link>
  ),
};
