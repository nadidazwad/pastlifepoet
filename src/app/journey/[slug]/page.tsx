import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowLeft, Calendar, Building2, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TextReveal } from "@/components/effects/TextReveal";
import rehypePrettyCode from "rehype-pretty-code";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "src/content/experience"));
  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

export default async function JourneyPage({ params }: PageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/experience", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-12">
          <Link href="/#experience">
            <MagneticButton>
              <div className="flex items-center gap-2 px-6 py-3">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-xs font-mono uppercase tracking-widest">Back to Journey</span>
              </div>
            </MagneticButton>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar Metadata */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-32">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-xanh mb-6 leading-tight">
                    {frontmatter.company}
                  </h1>
                  <div className="h-px w-full bg-border" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-muted">
                    <div className="p-2 bg-muted/10 rounded-lg">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted/50">Role</p>
                      <p className="text-sm font-mono uppercase tracking-wider text-foreground">{frontmatter.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-muted">
                    <div className="p-2 bg-muted/10 rounded-lg">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted/50">Period</p>
                      <p className="text-sm font-mono uppercase tracking-wider text-foreground">{frontmatter.period}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-muted">
                    <div className="p-2 bg-muted/10 rounded-lg">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted/50">Organization</p>
                      <p className="text-sm font-mono uppercase tracking-wider text-foreground">{frontmatter.company}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <p className="text-sm text-muted leading-relaxed italic">
                    &ldquo;{frontmatter.description || "A deep dive into my contributions and technical achievements during my tenure."}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-8 prose prose-invert max-w-none">
            <MDXRemote 
              source={content} 
              components={MDXComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark",
                        keepBackground: true,
                      },
                    ],
                  ],
                },
              }}
            />
          </article>
        </div>
      </div>
    </main>
  );
}
