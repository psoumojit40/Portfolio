"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import projects from "@/data/projects.json";

const ProjectCard3D = dynamic(
  () => import("@/components/three/ProjectCard3D"),
  { ssr: false }
);

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Only take the first two projects if more exist in the JSON
  const spotlightProjects = projects.slice(0, 2);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p className="text-[#e94560] text-sm tracking-[0.3em] uppercase mb-4">
            My Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Deep dives into complex systems and modern web architecture.
          </p>
        </motion.div>

        <div className="space-y-32">
          {spotlightProjects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col gap-12 items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* 3D Visual Side */}
                <div className="w-full md:w-1/2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <ProjectCard3D
                      title={project.title}
                      tech={project.tech}
                      index={0}
                      imageUrl={project.image}
                    />
                  </a>
                </div>

                {/* Text Context Side */}
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-3xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="pt-4">
                    <h4 className="text-sm text-zinc-500 uppercase tracking-widest mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-sm px-4 py-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}