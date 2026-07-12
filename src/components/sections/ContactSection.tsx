"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      ref={ref}
      // Changed to flex-col to naturally push the footer to the bottom
      className="relative min-h-screen flex flex-col pt-32"
    >
      {/* Main Contact Form Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex-grow flex flex-col justify-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#e94560] text-sm tracking-[0.3em] uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Have a project in mind? Send me a message and I&apos;ll get back to
            you as soon as possible.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-6 w-full"
        >
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-5 py-4 bg-zinc-900/70 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#e94560] transition-colors backdrop-blur-sm"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Mail"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-5 py-4 bg-zinc-900/70 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#e94560] transition-colors backdrop-blur-sm"
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="w-full px-5 py-4 bg-zinc-900/70 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#e94560] transition-colors resize-none backdrop-blur-sm"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-4 bg-[#e94560] text-white rounded-xl font-medium hover:bg-[#d63851] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending"
              ? "Sending..."
              : status === "success"
                ? "Message Sent!"
                : "Send Message"}
          </button>
          {status === "success" && (
            <p className="text-green-400 text-sm text-center">
              Message sent successfully! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Failed to send. Please try again or email me directly.
            </p>
          )}
        </motion.form>
      </div>

      {/* --- MEGA FOOTER SECTION --- */}
      <footer className="w-full bg-[#0a0a0a] border-t border-zinc-800/50 mt-auto z-10 relative">
        
        {/* Back to Top Bar */}
        <button
          onClick={scrollToTop}
          className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 transition-colors text-zinc-300 text-sm font-medium tracking-wide flex justify-center items-center gap-2"
        >
          <span>Back to top</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
          </svg>
        </button>

        {/* Multi-Column Links */}
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Column 1: Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">Explore</h3>
            <ul className="space-y-4">
              <li><button onClick={scrollToTop} className="text-zinc-400 hover:text-[#e94560] text-sm transition-colors">Home</button></li>
              <li><button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })} className="text-zinc-400 hover:text-[#e94560] text-sm transition-colors">About Me</button></li>
              <li><button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="text-zinc-400 hover:text-[#e94560] text-sm transition-colors">Featured Projects</button></li>
            </ul>
          </div>

          {/* Column 2: Socials (Requested) */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">Connect</h3>
            <ul className="space-y-4">
              <li>
                <a href="https://github.com/psoumojit40" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#e94560] text-sm transition-colors flex items-center gap-2">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/soumo09" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#e94560] text-sm transition-colors flex items-center gap-2">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/itzzme_soumo5082" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#e94560] text-sm transition-colors flex items-center gap-2">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Expertise */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">Expertise</h3>
            <ul className="space-y-4">
              <li className="text-zinc-400 text-sm">Full Stack Architecture</li>
              <li className="text-zinc-400 text-sm">Interactive 3D Visualizations</li>
              {/* <li className="text-zinc-400 text-sm">IoT Sensor-Cloud Systems</li> */}
              <li className="text-zinc-400 text-sm">Responsive UI/UX</li>
            </ul>
          </div>

          {/* Column 4: Location / Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wide">Location</h3>
            <ul className="space-y-4 text-zinc-400 text-sm leading-relaxed">
              <li>Based in Kolkata, WB</li>
              <li>Available for freelance opportunities and full-time roles globally.</li>
            </ul>
          </div>
        </div>

        {/* Divider & Centered Name/Logo */}
        {/* <div className="border-t border-zinc-800/50 py-10 flex justify-center items-center">
           <span className="text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#533483]">
              SOUMOJIT PAUL
           </span>
        </div> */}

        {/* Bottom Signature Line */}
        <div className="bg-[#050505] py-6 text-center border-t border-zinc-900">
          <p className="text-zinc-500 text-sm tracking-wide">
            Designed and engineered by Soumojit Paul.
          </p>
        </div>
      </footer>
    </section>
  );
}