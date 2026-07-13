"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  const name = "SOUMOJIT PAUL";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 text-center px-6">

        {/* Name */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.045,
                delayChildren: 0.05,
              },
            },
          }}
          className="text-white text-3xl md:text-4xl lg:text-5xl tracking-[0.4em] font-bold mb-6 flex justify-center"
        >
          {name.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 15,
                  filter: "blur(4px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                },
              }}
              className={char === " " ? "mr-4 md:mr-6" : ""}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{
            opacity: 0,
            y: 15,
            filter: "blur(4px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.45,
            delay: 0.45,
          }}
          className="text-[#e94560] text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        >
          Full Stack Developer
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            delay: 0.6,
            ease: "easeOut",
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          Building the
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#533483]">
            Future
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.45,
            delay: 0.85,
          }}
          className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto mb-10"
        >
          I craft immersive web experiences with modern technologies and 3D
          visualizations.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
          }}
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 1.0,
              },
            },
          }}
          className="flex gap-4 justify-center"
        >
          <motion.button
            variants={{
              hidden: {
                opacity: 0,
                y: 15,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.35,
                },
              },
            }}
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 bg-[#e94560] text-white rounded-full font-medium hover:bg-[#d63851] transition-colors shadow-lg shadow-[#e94560]/20 cursor-pointer"
          >
            View Projects
          </motion.button>

          <motion.button
            variants={{
              hidden: {
                opacity: 0,
                y: 15,
                scale: 0.95,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.35,
                },
              },
            }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 border border-zinc-600 text-zinc-300 rounded-full font-medium hover:border-white hover:text-white transition-colors backdrop-blur-sm cursor-pointer"
          >
            Get In Touch
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}