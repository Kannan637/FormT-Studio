"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { StaggeredRollingText } from "@/components/ui/animated-text";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ───────────────────────── Ticker ───────────────────────── */

function TickerUnit({
    text = "FormT Studio",
}: {
    text?: string;
}) {
    return (
        <div className="flex shrink-0 items-center">
            <span className="whitespace-nowrap text-[clamp(2.5rem,6.8vw,8.5rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-zinc-950/90 select-none">
                {text}
            </span>

            <span
                className="mx-8 inline-block h-3.5 w-3.5 shrink-0 rotate-45 bg-[#D7C2A3] sm:mx-12 sm:h-5 sm:w-5 md:mx-16 md:h-6 md:w-6 lg:mx-20"
                aria-hidden="true"
            />
        </div>
    );
}

/* ───────────────────── Scrolling Marquee ───────────────────── */

function ScrollMarquee({
    text = "FormT Studio",
    marqueeRef,
}: {
    text?: string;
    marqueeRef: React.RefObject<HTMLDivElement | null>;
}) {
    return (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex w-full -translate-y-1/2 items-center overflow-hidden py-6 sm:py-8">
            <div
                ref={marqueeRef}
                className="flex w-max items-center will-change-transform"
            >
                {Array.from({ length: 8 }).map((_, index) => (
                    <TickerUnit key={index} text={text} />
                ))}
            </div>
        </div>
    );
}

/* ───────────────────────── About Us ───────────────────────── */

export default function AboutUs() {
    const aboutSectionRef = useRef<HTMLElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);
    const bannerImgRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Marquee scrub along banner scroll
            if (marqueeRef.current && bannerRef.current) {
                gsap.fromTo(
                    marqueeRef.current,
                    { xPercent: 0 },
                    {
                        xPercent: -40,
                        ease: "none",
                        scrollTrigger: {
                            trigger: bannerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );
            }

            // Image subtle parallax & scale
            if (bannerImgRef.current && bannerRef.current) {
                gsap.fromTo(
                    bannerImgRef.current,
                    { yPercent: -4, scale: 1.06 },
                    {
                        yPercent: 4,
                        scale: 1.01,
                        ease: "none",
                        scrollTrigger: {
                            trigger: bannerRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );
            }

            // Text entrance reveals
            gsap.fromTo(
                ".about-label",
                { opacity: 0, x: -12 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".about-label",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".about-headline",
                { opacity: 0, y: 18 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".about-headline",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".about-desc",
                { opacity: 0, y: 12 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".about-desc",
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        },
        { scope: aboutSectionRef }
    );

    return (
        <section
            ref={aboutSectionRef}
            id="about"
            className="relative overflow-hidden border-t border-zinc-100 bg-white text-zinc-900"
            aria-label="About FormT Studio"
        >
            {/* Background grid */}
            <div
                className="pointer-events-none absolute inset-0 z-0 mx-auto grid max-w-[1920px] grid-cols-2 px-4 sm:px-6 md:grid-cols-4 md:px-10"
                aria-hidden="true"
            >
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-full ${
                            index === 0 ? "border-l border-zinc-200/80" : ""
                        } ${
                            index === 1 || index === 2
                                ? "hidden md:block md:border-l md:border-zinc-200/80"
                                : ""
                        } ${
                            index === 3
                                ? "border-r border-r-zinc-200/80 md:border-l md:border-zinc-200/80"
                                : ""
                        }`}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 py-20 sm:py-24 md:px-10 md:py-32 lg:py-36">
                {/* Intro */}
                <div className="grid grid-cols-1 gap-8 pb-16 sm:pb-20 md:grid-cols-4 md:gap-0 lg:pb-24">
                    {/* Section label */}
                    <div className="about-label md:col-span-1">
                        <span className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#555555]">
                            <span
                                className="h-1.5 w-1.5 bg-[#D7C2A3]"
                                aria-hidden="true"
                            />
                            About
                        </span>
                    </div>

                    {/* Headline and paragraph */}
                    <div className="min-w-0 md:col-span-3 md:pl-6 lg:pl-8">
                        <h4 className="about-headline max-w-[1050px] text-[clamp(1.625rem,2.5vw,2.25rem)] font-semibold leading-[1.25] tracking-[-0.035em] text-zinc-950 [text-wrap:pretty]">
                            FormT Studio is an architecture and interior
                            design studio founded in 2025, built on the
                            belief that good spaces should be thoughtfully
                            designed, beautifully detailed, and made for
                            everyday living.
                        </h4>

                        <p className="about-desc mt-8 max-w-[700px] text-[16px] sm:text-[18px] font-normal leading-[1.65] tracking-[-0.015em] text-zinc-600 sm:mt-9">
                            We blend architecture, interiors,
                            functionality, and aesthetics to create
                            purposeful spaces, from bespoke homes and
                            residential interiors to commercial and
                            hospitality environments.
                        </p>
                    </div>
                </div>

                {/* Bottom link and copyright */}
                <div className="border-t border-zinc-200/80 pt-8 sm:pt-10 md:pt-12">
                    <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-4 md:gap-0">
                        <div className="hidden md:block md:col-span-1" />

                        <div className="md:col-span-2 md:pl-6 lg:pl-8">
                            <a
                                href="#projects"
                                className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium leading-5 tracking-tight text-black transition-colors duration-200 hover:text-[#D7C2A3]"
                            >
                                <StaggeredRollingText text="More about us" />

                                <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                            </a>
                        </div>

                        <div className="text-left md:col-span-1 md:pr-2 md:text-right">
                            <span className="text-[12px] font-normal tracking-normal text-zinc-400">
                                © 2026 FormT Studio
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Architectural image */}
            <div
                ref={bannerRef}
                className="relative flex h-[46vh] min-h-[300px] max-h-[440px] w-full flex-col justify-between overflow-hidden sm:max-h-none sm:h-[80vh] sm:min-h-[500px] lg:h-[92vh]"
            >
                {/* Parallax background */}
                <div
                    ref={bannerImgRef}
                    className="absolute inset-0 z-0 will-change-transform"
                >
                    <Image
                        src="/about-arch.jpg"
                        alt="Curved brutalist concrete architecture"
                        fill
                        sizes="100vw"
                        className="h-full w-full object-cover object-[center_38%] opacity-75 grayscale contrast-110 brightness-100 sm:object-center"
                    />

                    <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-b from-white/10 via-transparent to-black/20" />
                </div>

                {/* Image grid lines */}
                <div
                    className="pointer-events-none absolute inset-0 z-10 mx-auto grid max-w-[1920px] grid-cols-2 px-4 sm:px-6 md:grid-cols-4 md:px-10"
                    aria-hidden="true"
                >
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-full ${
                                index === 0 ? "border-l border-black/[0.08]" : ""
                            } ${
                                index === 1 || index === 2
                                    ? "hidden md:block md:border-l md:border-black/[0.08]"
                                    : ""
                            } ${
                                index === 3
                                    ? "border-r border-r-black/[0.08] md:border-l md:border-black/[0.08]"
                                    : ""
                            }`}
                        />
                    ))}
                </div>

                {/* Centered scrolling marquee */}
                <ScrollMarquee text="FormT Studio" marqueeRef={marqueeRef} />

                <div className="relative z-20 mt-auto h-6 px-3" />
            </div>
        </section>
    );
}
