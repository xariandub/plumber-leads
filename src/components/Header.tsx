"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { business } from "@/config/business";
import { Magnetic } from "@/components/motion/Magnetic";

export function Header() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.4 });

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="h-[2px] w-full bg-copper-400"
      />
      <div className="border-b border-bone-100/[0.06] bg-ink-900/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:py-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-bone-100"
            data-cursor="hover"
          >
            <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full border border-copper-400/40 bg-copper-400/10 text-copper-300 transition group-hover:border-copper-400 group-hover:bg-copper-400/20">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 7a3 3 0 0 0-3 3v3l-5 5a2.121 2.121 0 0 0 3 3l5-5h3a3 3 0 0 0 3-3V9l-3 3h-2V10l3-3z" />
              </svg>
            </span>
            <span className="font-display text-lg italic tracking-editorial">
              {business.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-bone-200/80 md:flex">
            <a href="#services" className="link-sweep hover:text-bone-100">Services</a>
            <a href="#process" className="link-sweep hover:text-bone-100">How we work</a>
            <a href="#reviews" className="link-sweep hover:text-bone-100">Stories</a>
            <a href="#area" className="link-sweep hover:text-bone-100">Area</a>
          </nav>

          <Magnetic strength={8}>
            <a
              href={`tel:${business.phoneTel}`}
              className="group inline-flex items-center gap-2 rounded-full border border-copper-400/30 bg-copper-400/[0.08] px-4 py-2 text-sm font-medium text-copper-300 transition hover:border-copper-400 hover:bg-copper-400/15 hover:text-copper-200"
              data-cursor="hover"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-cursor-pulse rounded-full bg-copper-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-400" />
              </span>
              <span className="font-mono tabular-nums">{business.phone}</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
