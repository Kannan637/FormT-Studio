"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { StaggeredRollingText } from "@/components/ui/animated-text";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Service = {
    number: string;
    title: string;
    description: string;
    features: string[];
    image: string;
    alt: string;
};

const services: Service[] = [
    {
        number: "01",
        title: "Architecture",
        description:
            "From initial concept to final structure, we design buildings that balance functionality, aesthetics, and long-term durability.",
        features: [
            "Architectural Design",
            "Concept Development",
            "Space Planning",
            "Residential Architecture",
            "Commercial Architecture",
            "Building Renovation & Extensions",
            "3D Architectural Visualisation",
        ],
        image:
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=90",
        alt: "Contemporary architectural building",
    },
    {
        number: "02",
        title: "Interior Design",
        description:
            "We create considered interiors that combine materials, lighting, and spatial planning to improve the way people live and work.",
        features: [
            "Residential Interiors",
            "Commercial Interiors",
            "Hospitality Interiors",
            "Space Planning & Zoning",
            "Concept & Theme Development",
            "Material & Colour Selection",
            "Furniture & Joinery Design",
            "Lighting & Ceiling Design",
        ],
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
        alt: "Contemporary residential interior",
    },
    {
        number: "03",
        title: "Renovation & Transformation",
        description:
            "We transform existing buildings and spaces through thoughtful upgrades, modern materials, and practical design solutions.",
        features: [
            "Residential Renovation",
            "Commercial Renovation",
            "Interior Makeovers",
            "Space Transformation",
            "Façade Enhancement",
            "Adaptive Reuse",
        ],
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
        alt: "Renovated contemporary interior",
    },
    {
        number: "04",
        title: "Design & Build",
        description:
            "From planning to execution, we coordinate design, procurement, and construction to deliver a seamless project experience.",
        features: [
            "Turnkey Interior Solutions",
            "BOQ & Cost Planning",
            "Material Procurement",
            "Vendor & Contractor Coordination",
            "Site Supervision",
            "Quality Control",
            "Project Coordination",
        ],
        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90",
        alt: "Completed contemporary interior project",
    },
    {
        number: "05",
        title: "Consultancy",
        description:
            "We provide professional guidance at every stage, helping clients make informed decisions about design, materials, and execution.",
        features: [
            "Design Consultancy",
            "Architectural Consultancy",
            "Interior Consultancy",
            "Material Consultancy",
            "Space Planning",
            "Project Review & Guidance",
        ],
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90",
        alt: "Modern architectural workspace",
    },
    {
        number: "06",
        title: "Visualisation",
        description:
            "We bring design concepts to life through detailed visualisations that help clients understand a space before construction.",
        features: [
            "3D Exterior Visualisation",
            "3D Interior Visualisation",
            "Photorealistic Renders",
            "Walkthroughs",
            "Concept Presentation",
            "Material & Mood Boards",
        ],
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90",
        alt: "Contemporary interior design",
    },
];

function ServiceCard({
    service,
    index,
    total,
}: {
    service: Service;
    index: number;
    total: number;
}) {
    const cardRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    // Subtle parallax translation and scale as the card is covered by subsequent sticky cards
    useGSAP(
        () => {
            if (imageContainerRef.current && cardRef.current) {
                gsap.fromTo(
                    imageContainerRef.current,
                    { yPercent: 0, scale: 1.06 },
                    {
                        yPercent: -6,
                        scale: 1.0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: "top top",
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
            className="sticky top-0 grid h-[100svh] min-h-[600px] grid-cols-1 overflow-hidden border-b border-white/10 bg-[#000000] md:grid-cols-2"
            style={{
                zIndex: index + 1,
            }}
        >
            {/* Service information */}
            <div className="relative z-10 flex h-full min-h-0 flex-col justify-center overflow-y-auto bg-transparent px-6 py-10 sm:px-10 sm:py-14 md:h-auto md:border-r md:border-white/10 md:bg-[#000000] md:px-12 md:py-16 lg:px-16 lg:py-20">
                <span className="mb-4 text-[18px] sm:text-[20px] font-medium tracking-tight text-[#D7C2A3] tabular-nums">
                    {service.number} / {String(total).padStart(2, "0")}
                </span>

                <h3 className="text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-semibold leading-[1.08] tracking-[-0.045em] text-white">
                    {service.title}
                </h3>

                <p className="mt-6 max-w-[520px] text-[15px] sm:text-[16px] font-normal leading-[1.6] text-white/80 md:text-white/60">
                    {service.description}
                </p>

                <ul className="mt-8 space-y-3 sm:mt-9">
                    {service.features.map((feature) => (
                        <li
                            key={feature}
                            className="flex items-start gap-2.5 text-[14px] leading-5 text-white/85 md:text-white/70"
                        >
                            <span className="text-[#D7C2A3]">·</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Image: on mobile positioned behind text (absolute inset-0), on desktop right column (md:relative) */}
            <div className="absolute inset-0 z-0 min-h-0 overflow-hidden bg-[#111111] md:relative md:inset-auto md:z-auto">
                <div
                    ref={imageContainerRef}
                    className="absolute inset-0 will-change-transform"
                >
                    <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>

                {/* Mobile overlay for contrast and legibility behind text */}
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/95 via-black/80 to-black/65 md:hidden" />
            </div>
        </article>
    );
}

export default function ServicesSection() {
    return (
        <section id="services" className="min-h-screen bg-[#000000] text-white">
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-10">
                {/* Header */}
                <div className="grid grid-cols-1 border-l border-white/10 md:grid-cols-4">
                    <header className="flex min-h-[300px] flex-col justify-center border-r border-white/10 py-16 md:col-span-2 md:min-h-[420px] md:py-20">
                        <p className="mb-6 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/70">
                            <span className="h-1.5 w-1.5 bg-[#D7C2A3]" aria-hidden="true" />
                            Services
                        </p>

                        <h2 className="text-[clamp(2.625rem,5.5vw,5rem)] md:text-[64px] lg:text-[76px] font-semibold leading-[0.95] tracking-[-0.065em]">
                            What We Do
                        </h2>

                        <p className="mt-6 max-w-[460px] pr-6 text-[15px] sm:text-[16px] font-normal leading-[1.6] text-white/60">
                            From first concept to final finish, we offer a
                            comprehensive range of architecture, interior
                            design, renovation, and visualisation services.
                        </p>
                    </header>

                    <div className="flex items-center border-r border-white/10 px-4 py-8 sm:px-6 md:min-h-[420px] md:py-0">
                        <a
                            href="#contact"
                            className="group flex h-12 min-h-[48px] w-full select-none items-center justify-between overflow-hidden border border-zinc-200 bg-white text-[15px] sm:text-[16px] font-medium text-black transition-colors duration-200 hover:border-[#D7C2A3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7C2A3]"
                            aria-label="Start a project"
                        >
                            <div className="min-w-0 flex-1 px-5 text-[15px] sm:text-[16px] font-medium tracking-tight text-black">
                                <StaggeredRollingText text="Start a project" stagger={0.02} />
                            </div>

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border-l border-zinc-200 text-black transition-colors duration-200 group-hover:bg-[#D7C2A3]/10">
                                <ArrowRight className="h-[18px] w-[18px] stroke-[2] transition-transform duration-200 ease-out group-hover:translate-x-1" />
                            </div>
                        </a>
                    </div>

                    <div className="flex min-h-[100px] items-center border-r border-white/10 py-8 text-[12px] font-normal text-white/50 md:min-h-[420px]">
                        FormT Studio©
                    </div>
                </div>

                {/* Stacking cards */}
                <div className="relative border-l border-r border-white/10">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.number}
                            service={service}
                            index={index}
                            total={services.length}
                        />
                    ))}
                </div>

                {/* Bottom breathing space */}
                <div className="h-16 sm:h-20 md:h-28" />
            </div>
        </section>
    );
}
