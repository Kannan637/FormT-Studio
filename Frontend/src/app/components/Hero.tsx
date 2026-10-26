"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StaggeredRollingText, CharReveal, WordReveal } from "@/components/ui/animated-text";
import { ArrowRight, Plus } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* ──────────────────────── Project Data ──────────────────────── */

type Project = {
    name: string;
    image: string;
    thumbnail: string;
};

const projects: Project[] = [
    {
        name: "Ashcombe",
        image: "/hero/hero-1.png",
        thumbnail: "/hero/hero-1.png",
    },
    {
        name: "Concrete",
        image: "/hero/hero-2.png",
        thumbnail: "/hero/hero-2.png",
    },
    {
        name: "Minimal",
        image: "/hero/hero-3.png",
        thumbnail: "/hero/hero-3.png",
    },
    {
        name: "Residence",
        image: "/hero/hero-4.jpg",
        thumbnail: "/hero/hero-4.jpg",
    },
];

/* ──────────────────── Client Company Logos ──────────────────── */

const clientLogos = [
    { src: "/Logos/logo 1.png", alt: "Effilo" },
    { src: "/Logos/logo 2.png", alt: "GogoX" },
    { src: "/Logos/logo 3.png", alt: "Go C2A" },
    { src: "/Logos/logo 4.png", alt: "Medindia Hospitals" },
    { src: "/Logos/logo 5.png", alt: "Radiance Realty" },
    { src: "/Logos/logo 6.png", alt: "Dotts Tech" },
    { src: "/Logos/logo 7.png", alt: "Tesa" },
    { src: "/Logos/logo 8.png", alt: "Empire City Construction" },
    { src: "/Logos/logo 9.png", alt: "PR3" },
];

function ClientLogosMarquee() {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = marqueeRef.current;
            if (!el) return;
            const tween = gsap.to(el, {
                xPercent: -50,
                duration: 28,
                ease: "none",
                repeat: -1,
            });
            return () => {
                tween.kill();
            };
        },
        { scope: marqueeRef }
    );

    return (
        <div
            className="w-full overflow-hidden"
            style={{
                maskImage:
                    "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            }}
            aria-label="Selected client partners"
        >
            <div
                ref={marqueeRef}
                className="flex w-max items-center gap-9 pr-9 sm:gap-12 sm:pr-12 will-change-transform"
            >
                {[...clientLogos, ...clientLogos].map((logo, idx) => (
                    <div
                        key={`logo-${idx}`}
                        className="flex h-[74px] w-[74px] shrink-0 items-center justify-center opacity-85 transition-opacity hover:opacity-100"
                        aria-hidden={idx >= clientLogos.length}
                    >
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={74}
                            height={74}
                            className="h-[74px] w-[74px] object-contain mix-blend-screen brightness-125 filter"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ──────────────────── Component ──────────────────── */

const AUTO_SCROLL_INTERVAL = 5000;

export default function SolumHero() {
    const [activeProject, setActiveProject] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [dateTime, setDateTime] = useState("Oct 21, 01:03 PM");

    const heroRef = useRef<HTMLElement>(null);
    const bgContainerRef = useRef<HTMLDivElement>(null);
    const middleContentRef = useRef<HTMLDivElement>(null);
    const projectNameRef = useRef<HTMLSpanElement>(null);

    const paginate = useCallback((newIndex: number) => {
        setActiveProject(newIndex);
    }, []);

    const nextSlide = useCallback(() => {
        setActiveProject((current) => (current + 1) % projects.length);
    }, []);

    // Automatic background carousel progression
    useEffect(() => {
        if (isPaused) return;

        const interval = window.setInterval(() => {
            nextSlide();
        }, AUTO_SCROLL_INTERVAL);

        return () => window.clearInterval(interval);
    }, [isPaused, nextSlide]);

    // Live formatted date and time: e.g. "Oct 21, 01:03 PM"
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const month = now.toLocaleDateString("en-US", { month: "short" });
            const day = now.toLocaleDateString("en-US", { day: "2-digit" });
            const time = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            setDateTime(`${month} ${day}, ${time}`);
        };

        updateTime();
        const timer = window.setInterval(updateTime, 60_000);
        return () => window.clearInterval(timer);
    }, []);

    // GSAP Scroll Parallax & Entrance animations
    useGSAP(
        () => {
            // Background parallax on scroll
            if (bgContainerRef.current) {
                gsap.to(bgContainerRef.current, {
                    yPercent: 14,
                    scale: 1.05,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            }

            // Middle content parallax & fade on scroll
            if (middleContentRef.current) {
                gsap.to(middleContentRef.current, {
                    y: 40,
                    opacity: 0.35,
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "75% top",
                        scrub: true,
                    },
                });
            }

            // Grid lines entrance animation
            gsap.fromTo(
                ".hero-grid-line",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 0.9,
                    stagger: 0.08,
                    ease: "power2.out",
                    delay: 0.1,
                }
            );

            // Header items entrance animation
            gsap.fromTo(
                ".hero-header-item",
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power2.out",
                    delay: 0.15,
                }
            );

            // Vision CTA entrance
            gsap.fromTo(
                ".hero-vision-box",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    delay: 0.35,
                }
            );

            // Bottom elements entrance animation
            gsap.fromTo(
                ".hero-bottom-item",
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.5,
                }
            );
        },
        { scope: heroRef }
    );

    // GSAP tween for active project name transitions
    useGSAP(
        () => {
            if (projectNameRef.current) {
                gsap.fromTo(
                    projectNameRef.current,
                    { opacity: 0, y: 7 },
                    { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                );
            }
        },
        { dependencies: [activeProject] }
    );

    return (
        <div className="relative min-h-screen overflow-x-clip bg-[#000000] text-white [font-size:16px]">
            {/* ─── Hero Section ─── */}
            <section
                ref={heroRef}
                className="relative isolate flex min-h-[100svh] w-full flex-col justify-between overflow-hidden"
                id="home"
                aria-label="FormT Studio architecture and interior design"
            >
                {/* Background photo auto-scroll with subtle cinematic parallax */}
                <div
                    ref={bgContainerRef}
                    className="absolute -inset-[4%] z-0 overflow-hidden will-change-transform"
                >
                    {projects.map((project, idx) => (
                        <div
                            key={project.name}
                            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out will-change-transform ${
                                idx === activeProject
                                    ? "opacity-100 z-[1] scale-100"
                                    : "opacity-0 z-0 scale-105 pointer-events-none"
                            }`}
                            style={{
                                backgroundImage: `url("${project.image}")`,
                            }}
                            role="img"
                            aria-label={`${project.name} project view`}
                        />
                    ))}
                </div>

                {/* Ambient atmospheric overlay */}
                <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55" />

                {/* ─── 4-Column Architectural Grid Lines ─── */}
                <div
                    className="pointer-events-none absolute inset-0 z-[1] mx-auto grid max-w-[1920px] grid-cols-2 px-4 sm:px-6 md:grid-cols-4 md:px-10"
                    aria-hidden="true"
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className={`hero-grid-line h-full origin-top ${
                                i === 0 ? "border-l border-white/[0.22]" : ""
                            } ${
                                i === 1 || i === 2
                                    ? "hidden md:block md:border-l md:border-white/[0.22]"
                                    : ""
                            } ${
                                i === 3
                                    ? "border-r border-r-white/[0.22] md:border-l md:border-white/[0.22]"
                                    : ""
                            }`}
                        />
                    ))}
                </div>

                {/* ─── 1. Header (Top Row Snapped to 4 Columns) ─── */}
                <header className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-2 items-center gap-y-4 px-4 sm:px-6 pt-5 sm:pt-6 pb-3 text-[14px] font-medium tracking-tight text-white md:grid-cols-4 md:px-10">
                    {/* Col 1: Brand Logo */}
                    <div className="hero-header-item">
                        <a
                            href="#home"
                            className="inline-flex items-center gap-3 text-[16px] sm:text-[18px] font-bold tracking-tight text-white transition-opacity duration-200 hover:opacity-90"
                            aria-label="FormT Studio home"
                        >
                            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[4px] bg-white p-0.5 shadow-sm">
                                <Image
                                    src="/brand-logo.png"
                                    alt="FormT Studio brand logo"
                                    fill
                                    priority
                                    sizes="32px"
                                    className="object-contain"
                                />
                            </div>
                            <span>FormT Studio</span>
                        </a>
                    </div>

                    {/* Col 2: Studio Location */}
                    <div className="hero-header-item hidden min-w-0 pl-4 md:block text-[14px] font-medium text-white/90">
                        <span>Based In Coimbatore</span>
                    </div>

                    {/* Col 3: Live Date & Time */}
                    <div className="hero-header-item hidden min-w-0 pl-4 md:block text-[14px] font-medium text-white/90 tabular-nums">
                        <span>{dateTime}</span>
                    </div>

                    {/* Col 4: Contact Button */}
                    <div className="hero-header-item justify-self-end md:pl-4">
                        <a
                            href="mailto:formtstudio@gmail.com"
                            className="group inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent select-none"
                        >
                            <StaggeredRollingText text="Contact" />
                            <span className="grid h-5 w-5 place-items-center border border-white/80 transition-colors group-hover:border-white">
                                <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                            </span>
                        </a>
                    </div>
                </header>

                {/* ─── 2. Middle Content Grid (Hero Left & Right Sidebar) ─── */}
                <div
                    ref={middleContentRef}
                    className="relative z-[2] mx-auto grid w-full max-w-[1920px] flex-1 grid-cols-1 items-center gap-10 px-4 sm:px-6 py-6 sm:py-8 md:grid-cols-4 md:gap-0 md:px-10 md:py-8 will-change-transform"
                >
                    {/* Left Hero Headline (Spans Cols 1-3) */}
                    <div className="flex min-w-0 flex-col justify-center md:col-span-3">
                        <h1 className="flex select-none flex-wrap items-baseline break-words text-white font-bold leading-[0.92] tracking-[-0.075em] text-[clamp(2.625rem,11.5vw,11.5rem)]">
                            <CharReveal text="FormT Studio" delay={0.15} />
                        </h1>

                        <div className="mt-5 max-w-md text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-[1.5] tracking-tight text-white/90 sm:mt-6">
                            <WordReveal delay={0.4} stagger={0.02}>
                                Architecture and interior design studio creating homes and spaces that feel like they belong.
                            </WordReveal>
                        </div>
                    </div>

                    {/* Right Column (Snapped to Col 4): Vision Statement + CTA Box */}
                    <div className="hero-vision-box flex min-w-0 flex-col justify-center gap-6 sm:gap-7 md:col-span-1 md:pl-6 md:pt-0 w-full">
                        {/* Statement */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[22px] sm:text-[26px] md:text-[28px] font-semibold text-white w-full">
                                <span className="block">
                                    <WordReveal delay={0.35} stagger={0.03}>
                                        Innovating the
                                    </WordReveal>
                                </span>
                                <span className="block">
                                    <WordReveal delay={0.42} stagger={0.03}>
                                        Future Together
                                    </WordReveal>
                                </span>
                            </h2>
                        </div>

                        {/* Start a Project Button: 48px height, 20-24px padding, 16px/15px font, radius 0 */}
                        <div className="w-full">
                            <a
                                href="mailto:formtstudio@gmail.com?subject=Start%20a%20Project"
                                className="group flex h-12 min-h-[48px] w-full select-none items-center justify-between overflow-hidden border border-zinc-200 bg-white text-[15px] sm:text-[16px] font-medium text-black transition-colors duration-200 hover:border-[#D7C2A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7C2A3]"
                                aria-label="Start a Project"
                            >
                                <div className="min-w-0 flex-1 px-5 text-[15px] sm:text-[16px] font-medium tracking-tight text-black">
                                    <StaggeredRollingText text="Start a Project" stagger={0.02} />
                                </div>

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center border-l border-zinc-200 text-black transition-colors duration-200 group-hover:bg-[#D7C2A3]/10">
                                    <ArrowRight className="h-[18px] w-[18px] stroke-[2] transition-transform duration-200 ease-out group-hover:translate-x-1" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ─── 3. Bottom Row: Social Proof + Logo Marquee + Project Selector ─── */}
                <div className="relative z-[2] mx-auto grid w-full max-w-[1920px] grid-cols-1 items-end gap-6 px-4 sm:px-6 pb-6 sm:pb-8 md:grid-cols-4 md:gap-0 md:px-10 md:pb-8">
                    {/* Col 1 Bottom: Client Avatars & Trust Text */}
                    <div className="hero-bottom-item flex items-center gap-3">
                        <div className="flex pl-1">
                            {[12, 32, 47, 5].map((avatar) => (
                                <Avatar
                                    key={avatar}
                                    className="h-8 w-8 -ml-1.5 shrink-0 border border-white shadow-sm"
                                >
                                    <AvatarImage
                                        src={`https://i.pravatar.cc/80?img=${avatar}`}
                                        alt="Client avatar"
                                    />
                                    <AvatarFallback className="bg-white text-xs text-zinc-800">
                                        U
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        <p className="text-[14px] sm:text-[16px] font-normal leading-[1.45] tracking-tight text-white/90">
                            Over 10+ clients trust us
                            <br />
                            to shape their spaces.
                        </p>
                    </div>

                    {/* Cols 2 & 3 Bottom: Client Vector Logos Marquee */}
                    <div className="hero-bottom-item flex min-w-0 items-center px-0 md:col-span-2 md:px-4">
                        <ClientLogosMarquee />
                    </div>

                    {/* Col 4 Bottom: Project Selector & Thumbnails */}
                    <div className="hero-bottom-item flex min-w-0 flex-col justify-end md:col-span-1 md:pl-4">
                        {/* Project Name & Counter with smooth slide */}
                        <div className="mb-3 flex items-center justify-between gap-3 text-[14px] font-medium tracking-tight text-white">
                            <div className="overflow-hidden h-6 flex items-center">
                                <span ref={projectNameRef} className="inline-block">
                                    {projects[activeProject].name}
                                </span>
                            </div>
                            <span className="text-[#D7C2A3] font-medium tabular-nums">
                                {String(activeProject + 1).padStart(2, "0")} /{" "}
                                {String(projects.length).padStart(2, "0")}
                            </span>
                        </div>

                        {/* 4 Thumbnails in a single row with animated progress bar and hover pause */}
                        <div
                            className="grid grid-cols-4 gap-2"
                            role="group"
                            aria-label="Choose a featured project"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {projects.map((project, index) => {
                                const isActive = index === activeProject;
                                return (
                                    <button
                                        key={project.name}
                                        type="button"
                                        aria-pressed={isActive}
                                        aria-label={`Select ${project.name} project`}
                                        onClick={() => paginate(index)}
                                        className={`group/thumb relative aspect-[4/3] min-w-0 overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D7C2A3] ${
                                            isActive
                                                ? "opacity-100 shadow-md ring-1 ring-[#D7C2A3]"
                                                : "opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.name}
                                            fill
                                            sizes="120px"
                                            className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                                                isActive ? "scale-105" : "group-hover/thumb:scale-105"
                                            }`}
                                        />

                                        {/* Auto-scroll progress line on active slide (Warm beige accent) */}
                                        {isActive && (
                                            <div
                                                key={`progress-${activeProject}-${isPaused}`}
                                                className={`absolute bottom-0 left-0 h-[2.5px] bg-[#D7C2A3] z-10 shadow-sm ${
                                                    isPaused
                                                        ? "w-full"
                                                        : "w-full transition-all ease-linear"
                                                }`}
                                                style={{
                                                    animation: isPaused
                                                        ? "none"
                                                        : `heroThumbProgress ${AUTO_SCROLL_INTERVAL}ms linear forwards`,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
