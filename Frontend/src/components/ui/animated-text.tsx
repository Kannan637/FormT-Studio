"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ─────────────────────────────────────────────────────────────
   1. Staggered Rolling Text (Hover-driven letter ripple wave)
      Pure hardware-accelerated CSS transition linked to .group hover
───────────────────────────────────────────────────────────── */

interface StaggeredRollingTextProps {
  text: string;
  className?: string;
  /** Stagger delay between characters in seconds (default: 0.02) */
  stagger?: number;
  /** Animation duration per character in seconds (default: 0.32) */
  duration?: number;
}

export function StaggeredRollingText({
  text,
  className,
  stagger = 0.02,
  duration = 0.32,
}: StaggeredRollingTextProps) {
  const chars = text.split("");

  return (
    <span className={cn("inline-flex items-center select-none overflow-hidden", className)}>
      {chars.map((char, i) => {
        const isSpace = char === " ";
        const transitionDelay = `${i * stagger}s`;
        const transitionDuration = `${duration}s`;

        return (
          <span
            key={i}
            className="relative inline-block overflow-hidden"
            style={{
              width: isSpace ? "0.3em" : "auto",
            }}
          >
            {/* Primary Character Layer */}
            <span
              className="inline-block transition-transform ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-full will-change-transform"
              style={{
                transitionDuration,
                transitionDelay,
              }}
            >
              {isSpace ? "\u00A0" : char}
            </span>

            {/* Hidden Bottom Layer that rolls in */}
            <span
              className="absolute inset-0 inline-block translate-y-full transition-transform ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0 will-change-transform pointer-events-none"
              style={{
                transitionDuration,
                transitionDelay,
              }}
              aria-hidden="true"
            >
              {isSpace ? "\u00A0" : char}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. Word-by-Word Scroll Reveal Animation (GSAP + ScrollTrigger)
───────────────────────────────────────────────────────────── */

interface WordRevealProps {
  children: string;
  className?: string;
  /** Delay before animation starts (default: 0) */
  delay?: number;
  /** Stagger between words (default: 0.025) */
  stagger?: number;
}

export function WordReveal({
  children,
  className,
  delay = 0,
  stagger = 0.025,
}: WordRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = children.split(" ");

  useGSAP(
    () => {
      const wordElements = containerRef.current?.querySelectorAll(".gsap-word-span");
      if (!wordElements || wordElements.length === 0) return;

      gsap.fromTo(
        wordElements,
        {
          opacity: 0,
          y: "115%",
          rotateX: 18,
        },
        {
          opacity: 1,
          y: "0%",
          rotateX: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [children, delay, stagger] }
  );

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex flex-wrap", className)}
      style={{ perspective: 600 }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.24em] align-top pb-[0.06em]"
        >
          <span className="gsap-word-span inline-block will-change-transform will-change-opacity">
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. Character-by-Character Display Title Reveal (GSAP)
───────────────────────────────────────────────────────────── */

interface CharRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function CharReveal({
  text,
  className,
  stagger = 0.04,
  delay = 0.1,
}: CharRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const chars = text.split("");

  useGSAP(
    () => {
      const charElements = containerRef.current?.querySelectorAll(".gsap-char-span");
      if (!charElements || charElements.length === 0) return;

      gsap.fromTo(
        charElements,
        {
          opacity: 0,
          y: "125%",
          rotateZ: 4,
        },
        {
          opacity: 1,
          y: "0%",
          rotateZ: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [text, delay, stagger] }
  );

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex overflow-hidden", className)}
    >
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="gsap-char-span inline-block will-change-transform will-change-opacity">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
