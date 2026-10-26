"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Project = {
    name: string;
    year: string;
    category: string;
    image: string;
    alt: string;
    layout: string;
    imageRatio: string;
};

const projects: Project[] = [
    {
        name: "Ashcombe",
        year: "2026",
        category: "Architecture",
        image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=90",
        alt: "Modern geometric architecture against a clear blue sky",
        layout: "md:col-span-2 md:col-start-2 md:row-start-2",
        imageRatio: "aspect-[1.65/1]",
    },
    {
        name: "Harbor",
        year: "2025",
        category: "Cultural",
        image:
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=90",
        alt: "Contemporary sculptural architectural building",
        layout: "md:col-span-1 md:col-start-1 md:row-start-3 md:mt-0",
        imageRatio: "aspect-[1.38/1]",
    },
    {
        name: "Vantage",
        year: "2024",
        category: "Commercial",
        image:
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=90",
        alt: "Minimal contemporary building with strong architectural lines",
        layout: "md:col-span-2 md:col-start-3 md:row-start-3 md:mt-0",
        imageRatio: "aspect-[1.6/1]",
    },
    {
        name: "Fieldstone",
        year: "2025",
        category: "Residential",
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
        alt: "Premium contemporary residential interior with natural light",
        layout: "md:col-span-2 md:col-start-1 md:row-start-4",
        imageRatio: "aspect-[1.65/1]",
    },
    {
        name: "Morrow",
        year: "2024",
        category: "Interior",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
        alt: "Minimal modern interior with stone finishes and natural light",
        layout: "md:col-span-1 md:col-start-4 md:row-start-4 md:mt-0",
        imageRatio: "aspect-[1.38/1]",
    },
];

function ProjectCardItem({ project }: { project: Project }) {
    const cardRef = useRef<HTMLElement>(null);
    const clipRef = useRef<HTMLDivElement>(null);
    const scaleRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cardEl = cardRef.current;
            if (!cardEl) return;

            // 1. Scroll-linked reveal as the card enters the viewport
            const revealTl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardEl,
                    start: "top 95%",
                    end: "top 45%",
                    scrub: 0.5,
                },
            });

            if (clipRef.current) {
                revealTl.fromTo(
                    clipRef.current,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
                    0
                );
            }

            if (curtainRef.current) {
                revealTl.fromTo(
                    curtainRef.current,
                    { yPercent: 0 },
                    { yPercent: 100, ease: "none" },
                    0
                );
            }

            if (scaleRef.current) {
                revealTl.fromTo(
                    scaleRef.current,
                    { scale: 1.14 },
                    { scale: 1.0, ease: "none" },
                    0
                );
            }

            if (detailsRef.current) {
                revealTl.fromTo(
                    detailsRef.current,
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, ease: "none" },
                    0.25
                );
            }

            // 2. Parallax across the entire viewport journey
            if (parallaxRef.current) {
                gsap.fromTo(
                    parallaxRef.current,
                    { yPercent: -6 },
                    {
                        yPercent: 6,
                        ease: "none",
                        scrollTrigger: {
                            trigger: cardEl,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }
        },
        { scope: cardRef }
    );

    return (
        <article
            ref={cardRef}
            id={project.name.toLowerCase()}
            className={`group min-w-0 scroll-mt-24 pb-14 sm:pb-18 md:pb-24 ${project.layout}`}
        >
            <a
                href={`#${project.name.toLowerCase()}`}
                aria-label={`View ${project.name} project`}
                className="block"
            >
                {/* Project image container with top-to-bottom scroll reveal & parallax */}
                <div
                    className={`relative w-full overflow-hidden bg-neutral-100 ${project.imageRatio}`}
                >
                    {/* Top-to-bottom clip reveal layer */}
                    <div
                        ref={clipRef}
                        className="absolute inset-0 h-full w-full overflow-hidden will-change-[clip-path]"
                        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
                    >
                        {/* Dimensional settling scale */}
                        <div
                            ref={scaleRef}
                            className="absolute inset-0 h-full w-full will-change-transform"
                        >
                            {/* Scroll-linked parallax */}
                            <div
                                ref={parallaxRef}
                                className="absolute inset-0 h-full w-full will-change-transform"
                                style={{ transform: "scale(1.12)" }}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.alt}
                                    fill
                                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Smooth shutter curtain sliding from top to bottom */}
                    <div
                        ref={curtainRef}
                        className="pointer-events-none absolute inset-0 z-10 bg-neutral-100 will-change-transform"
                        aria-hidden="true"
                    />
                </div>

                {/* Project details */}
                <div
                    ref={detailsRef}
                    className="flex min-h-[44px] items-start justify-between gap-4 pt-4 pb-2"
                >
                    <div>
                        <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold leading-tight tracking-[-0.03em] text-black">
                            {project.name}
                        </h3>

                        <p className="mt-0.5 text-[12px] font-medium uppercase tracking-[0.08em] text-[#777777] transition-colors duration-200 group-hover:text-[#D7C2A3]">
                            {project.category}
                        </p>
                    </div>

                    <span className="shrink-0 text-[13px] font-medium tabular-nums text-[#777777]">
                        {project.year}
                    </span>
                </div>
            </a>
        </article>
    );
}

export default function ProjectPage() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".projects-header",
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".projects-header",
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="min-h-screen bg-white text-neutral-950"
        >
            <div className="relative mx-auto max-w-[1920px] px-4 sm:px-6 py-20 sm:py-28 md:px-10 md:py-36">
                {/* 4-Column Architectural Grid Overlay */}
                <div
                    className="pointer-events-none absolute inset-0 mx-auto grid max-w-[1920px] grid-cols-2 px-4 sm:px-6 md:grid-cols-4 md:px-10"
                    aria-hidden="true"
                >
                    <div className="h-full border-l border-neutral-200" />
                    <div className="hidden h-full border-l border-neutral-200 md:block" />
                    <div className="hidden h-full border-l border-neutral-200 md:block" />
                    <div className="h-full border-r border-neutral-200 md:border-l" />
                </div>

                {/* Portfolio grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-4">
                    {/* Centered heading at the top above Ashcombe */}
                    <header className="projects-header col-span-1 py-10 text-center md:col-span-2 md:col-start-2 md:row-start-1 md:pb-16 md:pt-8">
                        <p className="mb-4 flex items-center justify-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#555555]">
                            <span className="h-1.5 w-1.5 bg-[#D7C2A3]" aria-hidden="true" />
                            Selected Works
                        </p>

                        <h2 className="text-[clamp(2.625rem,5.5vw,5rem)] md:text-[64px] lg:text-[76px] font-semibold leading-[0.95] tracking-[-0.065em] text-black">
                            Recent Projects
                        </h2>
                    </header>

                    {/* Project cards */}
                    {projects.map((project) => (
                        <ProjectCardItem key={project.name} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
