"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Plus, X } from "lucide-react";
import { StaggeredRollingText } from "@/components/ui/animated-text";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type FAQ = {
    question: string;
    answer: string;
};

const faqs: FAQ[] = [
    {
        question: "What areas do you serve?",
        answer:
            "We work with residential, commercial, and hospitality clients across Coimbatore, Tamil Nadu, and South India. Reach out to check if we cover your location, we're also open to select projects across India.",
    },
    {
        question: "Do you handle both architecture and interior design?",
        answer:
            "Yes. We offer architectural design and interior design services, bringing spatial planning, material selection, lighting, and detailing together into one considered approach.",
    },
    {
        question: "How long does a typical project take?",
        answer:
            "Timelines depend on the project's size, complexity, approvals, and construction requirements. During our initial consultation, we'll discuss the scope and establish a realistic timeline.",
    },
    {
        question: "What’s the first step to working with FormT Studio?",
        answer:
            "It starts with a conversation about your goals, site, budget, and ideas. We'll discuss your requirements, answer your questions, and outline the next steps for your project.",
    },
    {
        question: "Do you manage contractors and construction, or just the design?",
        answer:
            "Our involvement can extend beyond design to coordination, site supervision, and construction-stage guidance. The exact scope is agreed upon before the project begins.",
    },
    {
        question: "What’s your typical budget range for projects?",
        answer:
            "Budgets vary according to project size, location, materials, and level of detailing. Contact us with a brief overview of your project for a more relevant discussion.",
    },
    {
        question: "Can you work with an existing structure, or only new builds?",
        answer:
            "We work with existing properties as well as new builds. This includes renovation, interior transformation, space planning, and adapting existing structures to new requirements.",
    },
    {
        question: "Do you offer virtual consultations for clients outside the area?",
        answer:
            "Yes. Virtual consultations are a convenient way to discuss your project, share references, review requirements, and explore how we can work together remotely.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex((current) => (current === index ? null : index));
    };

    useGSAP(
        () => {
            gsap.fromTo(
                ".faq-intro-block",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".faq-intro-block",
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
            id="faq"
            className="relative w-full overflow-hidden bg-white text-[#101010]"
        >
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 pb-20 sm:pb-28 md:px-10 md:pb-36">
                <div className="grid grid-cols-1 border-l border-[#dedede] md:grid-cols-4">
                    {/* Left introduction */}
                    <div className="faq-intro-block relative border-r border-[#dedede] px-0 pb-12 pt-12 md:col-span-2 md:min-h-[720px] md:pb-20 md:pt-16 md:pr-10 lg:pr-14">
                        <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-600">
                            <span className="h-1.5 w-1.5 shrink-0 bg-[#D7C2A3]" aria-hidden="true" />
                            <span>Frequently Asked</span>
                        </p>

                        <h2 className="mt-6 text-[clamp(2.625rem,5.5vw,5rem)] md:text-[64px] font-semibold leading-[0.98] tracking-[-0.065em]">
                            Common Questions
                        </h2>

                        <p className="mt-6 max-w-[460px] text-[16px] font-normal leading-[1.6] tracking-tight text-[#737373]">
                            Answers to the questions we hear most from
                            clients before starting a project.{" "}
                            <span className="text-[#101010]">
                                Don&apos;t see yours? Get in touch
                            </span>
                        </p>

                        <a
                            href="#contact"
                            className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium leading-5 tracking-tight text-neutral-900 transition-colors duration-200 hover:text-[#D7C2A3]"
                        >
                            <StaggeredRollingText text="Ask a question" />
                            <ArrowRight
                                size={18}
                                strokeWidth={1.8}
                                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                            />
                        </a>
                    </div>

                    {/* Right accordion */}
                    <div className="border-r border-[#dedede] md:col-span-2">
                        {/* Empty top area matching the reference */}
                        <div className="hidden h-[83px] border-b border-[#dedede] md:block" />

                        <div>
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <article
                                        key={faq.question}
                                        className="border-b border-[#dedede]"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFAQ(index)}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-${index}`}
                                            className={`flex min-h-[76px] w-full items-center gap-5 px-3 py-6 text-left transition-colors duration-200 ${
                                                isOpen
                                                    ? "bg-[#f5f5f5]"
                                                    : "bg-white hover:bg-[#fafafa]"
                                            }`}
                                        >
                                            {/* Number */}
                                            <span
                                                className={`w-[24px] shrink-0 text-[14px] sm:text-[15px] font-medium leading-5 tabular-nums transition-colors duration-200 ${
                                                    isOpen
                                                        ? "text-[#D7C2A3] font-semibold"
                                                        : "text-neutral-500"
                                                }`}
                                            >
                                                {String(index + 1).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            {/* Question */}
                                            <span className="min-w-0 flex-1 text-[15px] sm:text-[16px] font-medium leading-[1.4] tracking-tight text-neutral-900">
                                                {faq.question}
                                            </span>

                                            {/* Toggle icon */}
                                            <span
                                                className={`flex h-6 w-6 shrink-0 items-center justify-center transition-colors duration-200 ${
                                                    isOpen
                                                        ? "text-[#D7C2A3]"
                                                        : "text-neutral-600"
                                                }`}
                                            >
                                                {isOpen ? (
                                                    <X
                                                        size={17}
                                                        strokeWidth={1.5}
                                                    />
                                                ) : (
                                                    <Plus
                                                        size={19}
                                                        strokeWidth={1.5}
                                                    />
                                                )}
                                            </span>
                                        </button>

                                        <div
                                            id={`faq-answer-${index}`}
                                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                                isOpen
                                                    ? "grid-rows-[1fr] opacity-100"
                                                    : "grid-rows-[0fr] opacity-0"
                                            } overflow-hidden bg-[#f5f5f5]`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="pb-8 pl-[46px] pr-8 sm:pr-10 pt-1 sm:pl-[52px]">
                                                    <p className="max-w-[690px] text-[15px] sm:text-[16px] font-normal leading-[1.65] tracking-tight text-[#737373]">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
