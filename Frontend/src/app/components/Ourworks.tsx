"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { StaggeredRollingText } from "@/components/ui/animated-text";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type ProcessStep = {
    number: string;
    title: string;
    description: string;
};

const processSteps: ProcessStep[] = [
    {
        number: "01",
        title: "Discovery",
        description:
            "We learn about your site, your goals, your budget, and how you want the space to feel and function.",
    },
    {
        number: "02",
        title: "Design",
        description:
            "Our team develops initial design concepts, refining the vision with you until it fully captures what the space needs to be.",
    },
    {
        number: "03",
        title: "Development",
        description:
            "We turn the approved concept into detailed architectural drawings, technical specifications, and interior design documentation.",
    },
    {
        number: "04",
        title: "Build",
        description:
            "We oversee construction and installation, managing quality at every stage, through to a final walkthrough and handover of your completed space.",
    },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".process-heading",
                { opacity: 0, y: 18 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".process-heading",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".process-step-card",
                { opacity: 0, y: 22 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".process-steps-grid",
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
            id="process"
            className="w-full bg-[#000000] text-white"
        >
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 pb-20 sm:pb-28 md:px-10 md:pb-36">
                {/* Main 4-column grid */}
                <div className="grid grid-cols-1 border-l border-[#252525] md:grid-cols-4">
                    {/* Column 01 - Process label */}
                    <div
                        className="
                            relative
                            flex
                            min-h-[100px]
                            flex-col
                            justify-center
                            border-r
                            border-[#252525]
                            md:h-[420px]
                            md:justify-start
                            md:pt-[186px]
                        "
                    >
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-[#D7C2A3]" aria-hidden="true" />
                            <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/70">
                                Process
                            </span>
                        </div>
                    </div>

                    {/* Column 02 & 03 - Main heading */}
                    <div
                        className="
                            process-heading
                            flex
                            flex-col
                            justify-center
                            border-r
                            border-[#252525]
                            py-12
                            md:col-span-2
                            md:h-[420px]
                            md:py-0
                        "
                    >
                        <h2
                            className="
                                whitespace-normal
                                text-[clamp(2.625rem,5.5vw,5rem)]
                                md:text-[64px]
                                font-semibold
                                leading-[0.98]
                                tracking-[-0.065em]
                                md:whitespace-nowrap
                            "
                        >
                            How We Work
                        </h2>

                        <p
                            className="
                                mt-6
                                max-w-[510px]
                                text-[16px]
                                sm:text-[18px]
                                font-normal
                                leading-[1.55]
                                tracking-tight
                                text-[#858585]
                            "
                        >
                            A clear, considered path from first conversation
                            to finished space, so you always know what&apos;s
                            happening, and why.
                        </p>
                    </div>

                    {/* Column 04 - CTA (Height 48px, font 16px/15px, radius 0) */}
                    <div
                        className="
                            flex
                            items-center
                            border-r
                            border-[#252525]
                            px-4
                            py-8
                            sm:px-6
                            md:h-[420px]
                            md:py-0
                        "
                    >
                        <a
                            href="#contact"
                            className="
                                group
                                flex
                                h-12
                                min-h-[48px]
                                w-full
                                select-none
                                items-center
                                justify-between
                                overflow-hidden
                                border
                                border-zinc-200
                                bg-white
                                text-[15px]
                                sm:text-[16px]
                                font-medium
                                text-black
                                transition-colors
                                duration-200
                                hover:border-[#D7C2A3]
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-[#D7C2A3]
                            "
                            aria-label="Get in Touch"
                        >
                            <div className="min-w-0 flex-1 px-5 text-[15px] sm:text-[16px] font-medium tracking-tight text-black">
                                <StaggeredRollingText text="Get in Touch" stagger={0.02} />
                            </div>

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border-l border-zinc-200 text-black transition-colors duration-200 group-hover:bg-[#D7C2A3]/10">
                                <ArrowRight
                                    size={18}
                                    strokeWidth={2}
                                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                                />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Process cards */}
                <div
                    className="
                        process-steps-grid
                        grid
                        grid-cols-1
                        border-l
                        border-t
                        border-[#252525]
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    {processSteps.map((step) => (
                        <article
                            key={step.number}
                            className="
                                process-step-card
                                flex
                                min-h-[340px]
                                flex-col
                                justify-between
                                border-b
                                border-r
                                border-[#252525]
                                px-7
                                pb-8
                                pt-8
                                sm:px-8
                                sm:pb-9
                                sm:pt-9
                                md:min-h-[360px]
                            "
                        >
                            {/* Title and number */}
                            <div className="flex items-start justify-between gap-4">
                                <h3
                                    className="
                                        text-[22px]
                                        sm:text-[24px]
                                        md:text-[26px]
                                        font-semibold
                                        leading-[1.2]
                                        tracking-[-0.035em]
                                    "
                                >
                                    {step.title}
                                </h3>

                                <span
                                    className="
                                        pt-[3px]
                                        text-[15px]
                                        sm:text-[16px]
                                        font-medium
                                        leading-[20px]
                                        tabular-nums
                                        text-[#D7C2A3]
                                    "
                                >
                                    {step.number}
                                </span>
                            </div>

                            {/* Bottom-aligned description */}
                            <p
                                className="
                                    max-w-[390px]
                                    text-[15px]
                                    sm:text-[16px]
                                    font-normal
                                    leading-[1.55]
                                    tracking-tight
                                    text-[#808080]
                                "
                            >
                                {step.description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
