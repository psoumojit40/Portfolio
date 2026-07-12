"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js / Express", level: 85 },
  { name: "MongoDB / PostgreSQL", level: 80 },
  { name: "Three.js / WebGL", level: 75 },
  { name: "Tailwind CSS", level: 95 },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="text-[#e94560] text-sm tracking-[0.3em] uppercase mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Passionate about
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#533483]">
              Great Code
            </span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12">
            I&apos;m a full-stack developer with 5+ years of experience building
            modern web applications. I specialize in creating performant,
            scalable solutions with beautiful user interfaces. When I&apos;m not
            coding, you&apos;ll find me exploring new technologies or
            contributing to open-source projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-zinc-300 text-sm">{skill.name}</span>
                <span className="text-zinc-500 text-sm">{skill.level}%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#e94560] to-[#533483] rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}