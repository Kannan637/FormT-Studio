"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const visionItems = [
    {
        number: "01",
        title: "Our Mission",
        description:
            "To transform ideas into purposeful spaces by combining innovative design, functional planning, material intelligence, and thoughtful detailing. We strive to create environments that are unique to every client while maintaining a timeless and refined design language.",
    },
    {
        number: "02",
        title: "Our Vision",
        description:
            "To deliver a seamless design-to-execution experience through clear communication, responsible planning, quality craftsmanship, and attention to detail. We aim to build lasting relationships with our clients by making every project transparent, collaborative, and meaningful.",
    },
];

export default function OurVision() {
    const imageRef = useRef<HTMLDivElement>(null);
    const parallaxImgRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            if (parallaxImgRef.current && imageRef.current) {
                gsap.fromTo(
                    parallaxImgRef.current,
                    { yPercent: -6, scale: 1.08 },
                    {
                        yPercent: 6,
                        scale: 1.02,
                        ease: "none",
                        scrollTrigger: {
                            trigger: imageRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            }

            gsap.fromTo(
                ".vision-title",
                { opacity: 0, y: 24 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".vision-title",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".vision-card",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".vision-cards-grid",
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
            id="our-vision"
            className="relative overflow-hidden bg-white text-[#111111]"
        >
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 md:px-10">
                {/* Editorial introduction */}
                <div className="grid grid-cols-1 border-x border-[#dedede] md:grid-cols-4">
                    <div className="border-r border-[#dedede] py-10 md:min-h-[360px] md:pt-12">
                        <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-600">
                            <span className="h-1.5 w-1.5 bg-[#D7C2A3]" aria-hidden="true" />
                            Our Philosophy
                        </p>

                        <p className="mt-16 hidden max-w-[180px] text-[13px] leading-[1.65] text-[#858585] md:block">
                            Architecture is not just about the spaces we
                            create, but how people experience them.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center py-10 md:col-span-3 md:min-h-[360px] md:pl-8 lg:pl-12">
                        <h2 className="vision-title max-w-[1150px] text-[clamp(2.625rem,5.5vw,5rem)] md:text-[64px] lg:text-[76px] font-semibold leading-[0.95] tracking-[-0.065em]">
                            Design with
                            <br />
                            purpose. Build
                            <br />
                            <span className="text-[#8a8a8a]">
                                with meaning.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-[520px] text-[15px] sm:text-[16px] font-normal leading-[1.6] text-[#737373] md:ml-auto md:mr-8 md:mt-8">
                            We believe great architecture begins with
                            understanding people, respecting materials,
                            and creating spaces that stand the test of time.
                        </p>
                    </div>
                </div>

                {/* Architectural image */}
                <div
                    ref={imageRef}
                    className="relative h-[380px] overflow-hidden border-x border-[#dedede] bg-[#e9e9e7] sm:h-[480px] md:h-[min(72vw,760px)]"
                >
                    <div
                        ref={parallaxImgRef}
                        className="absolute inset-0 h-[115%] w-full will-change-transform"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2400&q=90"
                            alt="Sculptural contemporary architecture with refined geometric forms"
                            fill
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    </div>

                    {/* Restrained image contrast */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Image grid lines snapped to master layout */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 grid grid-cols-2 px-4 sm:px-6 md:grid-cols-4 md:px-10"
                    >
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={`h-full ${
                                    index === 0
                                        ? "border-l border-white/25"
                                        : ""
                                } ${
                                    index === 1 || index === 2
                                        ? "hidden md:block md:border-l md:border-white/25"
                                        : ""
                                } ${
                                    index === 3
                                        ? "border-r border-r-white/25 md:border-l md:border-white/25"
                                        : ""
                                }`}
                            />
                        ))}
                    </div>

                    {/* Image label */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
                        <div>
                            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/80">
                                FormT Studio
                            </p>

                            <p className="mt-2 text-xl font-medium tracking-tight sm:text-2xl md:text-3xl">
                                Beyond the ordinary.
                            </p>
                        </div>

                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/60">
                            <ArrowDownRight size={20} strokeWidth={1.5} />
                        </span>
                    </div>
                </div>

                {/* Mission and vision cards */}
                <div className="vision-cards-grid grid grid-cols-1 border-x border-b border-[#dedede] md:grid-cols-2">
                    {visionItems.map((item, index) => (
                        <article
                            key={item.number}
                            className={`vision-card flex min-h-[310px] flex-col p-6 sm:p-9 md:min-h-[340px] md:p-10 lg:p-12 ${
                                index === 0
                                    ? "border-b border-[#dedede] md:border-b-0 md:border-r"
                                    : "bg-[#f5f5f3]"
                            }`}
                        >
                            <div className="flex items-center justify-between border-b border-[#dedede] pb-5">
                                <span className="text-[12px] font-semibold tabular-nums text-[#D7C2A3]">
                                    {item.number} / 02
                                </span>

                                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#858585]">
                                    {index === 0 ? "Purpose" : "Direction"}
                                </span>
                            </div>

                            <h3 className="mt-7 text-[26px] sm:text-[32px] md:text-[36px] font-semibold leading-[1.1] tracking-[-0.04em]">
                                {item.title}
                            </h3>

                            <div className="mt-auto grid grid-cols-1 gap-5 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
                                <p className="max-w-[430px] text-[15px] sm:text-[16px] font-normal leading-[1.6] text-[#666666]">
                                    {item.description}
                                </p>

                                <span
                                    aria-hidden="true"
                                    className="hidden h-11 w-11 items-center justify-center border border-[#dedede] transition-colors duration-200 hover:border-[#D7C2A3] hover:text-[#D7C2A3] sm:flex"
                                >
                                    <ArrowUpRight
                                        size={18}
                                        strokeWidth={1.5}
                                    />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Closing statement */}
                <div className="grid grid-cols-1 border-x border-b border-[#dedede] md:grid-cols-4">
                    <div className="border-r border-[#dedede] py-7 md:col-span-1 md:py-10">
                        <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#858585]">
                            Our Approach
                        </span>
                    </div>

                    <div className="py-8 md:col-span-3 md:py-10 md:pl-8 lg:pl-12">
                        <p className="max-w-[850px] text-[clamp(1.5rem,2.8vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.04em]">
                            Every detail has a purpose. Every space tells a
                            story. Every project is an opportunity to create
                            something meaningful.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
