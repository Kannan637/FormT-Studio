"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Mail,
    Phone,
    ArrowRight,
} from "lucide-react";
import { StaggeredRollingText } from "@/components/ui/animated-text";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const pageLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Stories", href: "#client-stories" },
    { label: "FAQ", href: "#faq" },
];

const legalLinks = [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
];

const contactDetails = {
    email: "formtstudio@gmail.com",
    phone: "+91 733-9423514",
    address: "2, Sarcarsamakulam, Kovilpalayam, Coimbatore, Tamil Nadu – 641107",
};

interface TeamMember {
    name: string;
    role: string;
    image: string;
    objectPosition?: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Ar. Tharanika (UK)",
        role: "Founder & Principal Architect",
        image: "/footer-studio.jpg",
        objectPosition: "object-center",
    },
    {
        name: "Chandru",
        role: "Design Execution",
        image: "/team-chandru.jpg",
        objectPosition: "object-[center_20%]",
    },
    {
        name: "Bharath",
        role: "Site Executive",
        image: "/team-bharath.jpg",
        objectPosition: "object-center",
    },
];

export default function Footer() {
    const [teamIndex, setTeamIndex] = useState(0);
    const footerRef = useRef<HTMLElement>(null);
    const memberCardRef = useRef<HTMLDivElement>(null);

    const nextTeamMember = () => {
        setTeamIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const prevTeamMember = () => {
        setTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    const currentMember = teamMembers[teamIndex];

    useGSAP(
        () => {
            gsap.fromTo(
                ".footer-reveal",
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".footer-reveal",
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        },
        { scope: footerRef }
    );

    useGSAP(
        () => {
            if (memberCardRef.current) {
                gsap.fromTo(
                    memberCardRef.current,
                    { opacity: 0, x: 14 },
                    { opacity: 1, x: 0, duration: 0.32, ease: "power2.out" }
                );
            }
        },
        { dependencies: [teamIndex] }
    );

    return (
        <footer
            ref={footerRef}
            id="contact"
            className="relative isolate w-full overflow-hidden bg-[#000000] text-white"
        >
            <div className="relative z-10 mx-auto max-w-[1920px] px-4 sm:px-6 pb-12 sm:pb-16 md:px-10 md:pb-20">
                {/* Main Grid: First 3 Grids for Footer Section | Last Grid for Img Carousel */}
                <div
                    className="
                        relative isolate grid grid-cols-1
                        border-x border-t border-[#292929]
                        lg:grid-cols-4
                    "
                >
                    {/* Unified Left Section (First 3 Grids) */}
                    <section
                        aria-labelledby="footer-cta-title"
                        className="
                            relative z-10 flex min-w-0 flex-col justify-between
                            border-b border-[#292929] p-8
                            sm:p-10 md:p-12 lg:col-span-3 lg:border-b-0 lg:border-r lg:border-[#292929] lg:p-14 xl:p-16
                        "
                    >
                        <div className="footer-reveal">
                            <h2
                                id="footer-cta-title"
                                className="
                                    text-[clamp(2.625rem,4.5vw,4.5rem)]
                                    md:text-[60px]
                                    font-semibold
                                    leading-[1.0]
                                    tracking-[-0.065em]
                                "
                            >
                                Your Next Space
                                <br />
                                Starts Here.
                            </h2>

                            <p className="mt-4 max-w-[440px] text-[15px] sm:text-[16px] font-normal leading-[1.55] tracking-tight text-[#858585]">
                                Every great space starts with a conversation.
                                Reach out and let&apos;s begin yours.
                            </p>

                            <div className="mt-8">
                                <a
                                    href="mailto:formtstudio@gmail.com?subject=Start%20a%20Project"
                                    className="group inline-flex h-12 min-h-[48px] w-full max-w-[280px] select-none items-center justify-between overflow-hidden border border-zinc-200 bg-white text-[15px] sm:text-[16px] font-medium text-black transition-colors duration-200 hover:border-[#D7C2A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7C2A3]"
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

                            {/* Contact & Navigation inside this single section */}
                            <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-14 pt-10 sm:pt-12 border-t border-[#222222]">
                                {/* Contact Us */}
                                <div>
                                    <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.12em] text-[#9c9c9c]">
                                        Contact Us
                                    </p>

                                    <ul className="flex flex-col gap-4">
                                        <li>
                                            <a
                                                href={`mailto:${contactDetails.email}`}
                                                className="group flex min-w-0 items-start gap-3 text-[14px] sm:text-[15px] leading-[1.6] text-[#ededed] transition-colors duration-200 hover:text-[#D7C2A3]"
                                            >
                                                <Mail
                                                    size={16}
                                                    strokeWidth={1.5}
                                                    className="mt-1 shrink-0 text-[#858585] transition-colors group-hover:text-[#D7C2A3]"
                                                />
                                                <span className="min-w-0 break-all">
                                                    {contactDetails.email}
                                                </span>
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="tel:+917339423514"
                                                className="group flex items-start gap-3 text-[14px] sm:text-[15px] leading-[1.6] text-[#ededed] transition-colors duration-200 hover:text-[#D7C2A3]"
                                            >
                                                <Phone
                                                    size={16}
                                                    strokeWidth={1.5}
                                                    className="mt-1 shrink-0 text-[#858585] transition-colors group-hover:text-[#D7C2A3]"
                                                />
                                                <span>{contactDetails.phone}</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                href="https://www.google.com/maps/search/?api=1&query=2%2C%20Sarcarsamakulam%2C%20Kovilpalayam%2C%20Coimbatore%2C%20Tamil%20Nadu%20641107"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-start gap-3 text-[14px] sm:text-[15px] leading-[1.65] text-[#ededed] transition-colors duration-200 hover:text-[#D7C2A3]"
                                            >
                                                <MapPin
                                                    size={16}
                                                    strokeWidth={1.5}
                                                    className="mt-1 shrink-0 text-[#858585] transition-colors group-hover:text-[#D7C2A3]"
                                                />
                                                <span>
                                                    2, Sarcarsamakulam,
                                                    <br />
                                                    Kovilpalayam, Coimbatore,
                                                    <br />
                                                    Tamil Nadu – 641107
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Explore Studio */}
                                <div>
                                    <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.12em] text-[#9c9c9c]">
                                        Explore Studio
                                    </p>

                                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1 sm:gap-y-3">
                                        {pageLinks.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    className="text-[14px] font-medium text-[#b3b3b3] transition-colors duration-200 hover:text-[#D7C2A3] focus-visible:outline-none focus-visible:underline"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Right Side — Meet Our Team Carousel (Last Grid) */}
                    <section
                        aria-labelledby="footer-team-title"
                        className="
                            relative z-10 flex min-w-0 flex-col justify-between
                            p-6 sm:p-8 lg:col-span-1 lg:p-7 xl:p-8 2xl:p-10
                        "
                    >
                        <div className="footer-reveal flex w-full max-w-[340px] flex-col mx-auto sm:max-w-[360px] lg:max-w-none">
                            {/* Header & Controls */}
                            <div className="mb-4 flex items-center justify-between gap-2">
                                <p
                                    id="footer-team-title"
                                    className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#737373]"
                                >
                                    Meet Our Team
                                </p>

                                {/* Carousel Navigation Buttons */}
                                <div
                                    className="flex items-center gap-1.5"
                                    role="group"
                                    aria-label="Team carousel controls"
                                >
                                    <button
                                        type="button"
                                        onClick={prevTeamMember}
                                        aria-label="Previous team member"
                                        className="
                                            flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center
                                            border border-white/20 text-white/80
                                            transition-all duration-200
                                            hover:border-white hover:bg-white hover:text-black
                                            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white
                                        "
                                    >
                                        <ChevronLeft size={16} strokeWidth={1.8} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={nextTeamMember}
                                        aria-label="Next team member"
                                        className="
                                            flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center
                                            border border-white/20 text-white/80
                                            transition-all duration-200
                                            hover:border-white hover:bg-white hover:text-black
                                            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white
                                        "
                                    >
                                        <ChevronRight size={16} strokeWidth={1.8} />
                                    </button>
                                </div>
                            </div>

                            {/* Carousel Card with GSAP transition */}
                            <div className="relative">
                                <div
                                    ref={memberCardRef}
                                    key={currentMember.name}
                                    className="flex flex-col will-change-transform"
                                >
                                    {/* Card Image — Borderless 2:3 aspect ratio */}
                                    <div className="group relative aspect-[2/3] w-full overflow-hidden bg-[#1c1c1c]">
                                        <Image
                                            src={currentMember.image}
                                            alt={`${currentMember.name} — ${currentMember.role}, FormT Studio`}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 360px"
                                            className={`h-full w-full object-cover ${
                                                currentMember.objectPosition ||
                                                "object-center"
                                            } transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                                        />
                                        <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                        {/* Role pill badge */}
                                        <div className="absolute top-3 left-3 z-10 border border-[#D7C2A3]/30 bg-black/85 px-2.5 py-1 text-[11px] font-medium tracking-tight text-[#D7C2A3] backdrop-blur-sm">
                                            {currentMember.role}
                                        </div>
                                    </div>

                                    {/* Member Information */}
                                    <div className="mt-4 flex items-center justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-white sm:text-[16px]">
                                                {currentMember.name}
                                            </h3>
                                            <p className="mt-0.5 truncate text-[11px] text-[#8a8a8a] sm:text-[12px]">
                                                {currentMember.role}
                                            </p>
                                        </div>

                                        <span className="shrink-0 font-mono text-[10px] tracking-wider text-[#888888] sm:text-[11px]">
                                            0{teamIndex + 1} / 0{teamMembers.length}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Indicators */}
                            <div
                                className="mt-4 flex items-center gap-1.5"
                                aria-label="Team carousel pagination"
                            >
                                {teamMembers.map((member, idx) => (
                                    <button
                                        key={member.name}
                                        type="button"
                                        onClick={() => setTeamIndex(idx)}
                                        aria-label={`View slide ${idx + 1}: ${member.name}`}
                                        className={`h-1 transition-all duration-300 ${
                                            idx === teamIndex
                                                ? "w-8 bg-[#D7C2A3]"
                                                : "w-2.5 bg-white/25 hover:bg-white/50"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Bottom — Brand Name */}
                <div
                    className="
                        relative z-10 overflow-hidden
                        border-x border-t border-[#292929]
                        py-12 px-6 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:py-24
                    "
                >
                    <div className="flex items-baseline select-none">
                        <span
                            className="
                                whitespace-nowrap
                                text-[clamp(3.4rem,13vw,13.8rem)]
                                font-bold
                                leading-[0.8]
                                tracking-[-0.08em]
                                text-[#f0f0f0]
                            "
                        >
                            FormT Studio
                        </span>
                    </div>
                </div>

                {/* Below That — Legal Terms & Copyright */}
                <div
                    className="
                        relative z-10 flex flex-col gap-4
                        border-x border-t border-b border-[#292929]
                        py-6 px-6 sm:px-8 md:px-10 sm:py-7
                        sm:flex-row sm:items-center sm:justify-between
                    "
                >
                    {/* Legal Links */}
                    <nav aria-label="Legal navigation">
                        <ul className="flex items-center gap-6">
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-[12px] font-medium text-[#858585] transition-colors duration-200 hover:text-[#D7C2A3] focus-visible:outline-none focus-visible:underline"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Copyright & Segment details */}
                    <div className="flex flex-col gap-2 text-[12px] text-[#777777] sm:flex-row sm:items-center sm:gap-6">
                        <div className="flex items-center gap-2.5">
                            <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-[2px] bg-white p-0.5">
                                <Image
                                    src="/brand-logo.png"
                                    alt="FormT Studio"
                                    fill
                                    sizes="20px"
                                    className="object-contain"
                                />
                            </div>
                            <p>© 2026 FormT Studio. All rights reserved.</p>
                        </div>
                        <span className="hidden text-[#444444] sm:inline">·</span>
                        <p>Architecture · Interiors · Spaces</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
