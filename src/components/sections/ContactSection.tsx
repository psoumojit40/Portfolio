"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center py-32"
    >
      {/* Background gradient removed so the Global Swarm shows through */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-6"
        >
          {/* Input fields remain unchanged */}
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
              placeholder="Your Email"
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
    </section>
  );
}