"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Testimonial = {
    id: string;
    title: string;
    quote: string;
    name: string;
    role: string;
    image: string;
    rating: number;
};

const testimonials: Testimonial[] = [
    {
        id: "full-home-renovation",
        title: "Full Home Renovation",
        quote:
            "We came to FormT Studio with a house that no longer fit our lives and left with a home that finally does. Every detail feels considered, down to the way light moves through the rooms at different times of day.",
        name: "Elena M.",
        role: "Private Residence",
        image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        rating: 5,
    },
    {
        id: "office-design",
        title: "Office Design",
        quote:
            "Our new office doesn't just look good, it actually works better for how our team operates. FormT Studio took the time to understand our workflow before drawing a single wall.",
        name: "David R.",
        role: "Founder",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        rating: 5,
    },
    {
        id: "new-build-residential",
        title: "New Build - Residential",
        quote:
            "From the first sketch to the final walkthrough, the process felt collaborative rather than transactional. They listened, pushed back when needed, and the result exceeded what we imagined.",
        name: "The Whitfield Family",
        role: "Private Residence",
        image:
            "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=120&q=80",
        rating: 5,
    },
    {
        id: "kitchen-renovation",
        title: "Kitchen Renovation",
        quote:
            "I didn't think a renovation could be this smooth. They managed contractors, timelines, and budget without us having to chase anything down.",
        name: "Priya K.",
        role: "Private Residence",
        image:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80",
        rating: 5,
    },
    {
        id: "contemporary-villa",
        title: "Contemporary Villa",
        quote:
            "The team understood our vision immediately. The materials, proportions, and natural light work beautifully together. The entire experience felt considered from start to finish.",
        name: "Arjun S.",
        role: "Villa Owner",
        image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
        rating: 5,
    },
    {
        id: "boutique-workspace",
        title: "Boutique Workspace",
        quote:
            "Every detail was thoughtfully planned. The new space reflects our brand while making everyday work more comfortable and efficient.",
        name: "Meera P.",
        role: "Business Owner",
        image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        rating: 5,
    },
];

const VISIBLE_COUNT = 4;

export default function ClientStories() {
    const [page, setPage] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const maxPage = Math.max(0, testimonials.length - VISIBLE_COUNT);

    const visibleTestimonials = testimonials.slice(
        page,
        page + VISIBLE_COUNT
    );

    function previous() {
        setPage((current) => Math.max(0, current - 1));
    }

    function next() {
        setPage((current) => Math.min(maxPage, current + 1));
    }

    // Scroll entrance reveals
    useGSAP(
        () => {
            gsap.fromTo(
                ".stories-title",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".stories-title",
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".stories-desc",
                { opacity: 0, y: 14 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".stories-desc",
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    // Slide transition when page changes
    useGSAP(
        () => {
            if (gridRef.current) {
                gsap.fromTo(
                    gridRef.current.children,
                    { opacity: 0, x: 10 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.28,
                        stagger: 0.04,
                        ease: "power2.out",
                    }
                );
            }
        },
        { dependencies: [page] }
    );

    return (
        <section
            ref={sectionRef}
            id="client-stories"
            className="w-full overflow-hidden bg-white text-[#101010]"
            aria-label="Client stories"
        >
            <div className="mx-auto max-w-[1920px] px-4 sm:px-6 pb-20 sm:pb-28 md:px-10 md:pb-36">
                {/* ─────────────── Section heading ─────────────── */}

                <div className="grid grid-cols-1 border-l border-[#dedede] md:grid-cols-4">
                    {/* Section label */}
                    <div className="border-r border-[#dedede] py-10 md:min-h-[380px] md:pt-12">
                        <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-600">
                            <span
                                className="h-1.5 w-1.5 shrink-0 bg-[#D7C2A3]"
                                aria-hidden="true"
                            />
                            Client Stories
                        </p>
                    </div>

                    {/* Main heading */}
                    <div className="relative border-r border-[#dedede] py-12 md:col-span-3 md:min-h-[380px] md:pb-[90px] md:pt-12">
                        <h2 className="stories-title max-w-[1400px] text-[clamp(2.25rem,4.4vw,4rem)] md:text-[56px] lg:text-[64px] font-semibold leading-[1.05] tracking-[-0.055em] [text-wrap:pretty]">
                            From First Consultation to Final
                            Walkthrough, Here&apos;s How Our Clients
                            Describe Working With FormT Studio
                        </h2>

                        <p className="stories-desc mt-6 max-w-[590px] text-[16px] sm:text-[18px] font-normal leading-[1.55] tracking-tight text-[#737373]">
                            The spaces we design are only part of the
                            story, hear from the people who lived
                            through the process, and now live in the
                            result.
                        </p>

                        {/* Navigation */}
                        <div className="absolute bottom-[6px] right-0 flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={previous}
                                disabled={page === 0}
                                aria-label="Previous testimonials"
                                className="flex h-11 w-11 items-center justify-center border border-black bg-black text-white transition-colors duration-200 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                            >
                                <ChevronLeft
                                    size={18}
                                    strokeWidth={1.75}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={next}
                                disabled={page === maxPage}
                                aria-label="Next testimonials"
                                className="flex h-11 w-11 items-center justify-center border border-black bg-black text-white transition-colors duration-200 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                            >
                                <ChevronRight
                                    size={18}
                                    strokeWidth={1.75}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ─────────────── Testimonial grid ─────────────── */}

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 items-stretch border-l border-t border-[#dedede] sm:grid-cols-2 lg:grid-cols-4"
                >
                    {visibleTestimonials.map((testimonial) => (
                        <article
                            key={testimonial.id}
                            className="
                                group flex h-full min-h-[400px] flex-col justify-between
                                border-r border-b border-[#dedede]
                                bg-white transition-colors duration-200
                                hover:bg-[#fafafa]
                                md:min-h-[420px]
                            "
                        >
                            {/* Card Body: Title, Rating, and Quote */}
                            <div className="flex flex-1 flex-col p-7 pb-7 sm:p-8 sm:pb-8 md:p-9 md:pb-9">
                                {/* Project title and rating */}
                                <div className="flex min-h-[36px] items-center justify-between gap-3 border-b border-[#dedede] pb-4">
                                    <h3 className="min-w-0 flex-1 text-[14px] font-semibold tracking-tight text-neutral-900">
                                        {testimonial.title}
                                    </h3>

                                    <div
                                        className="flex shrink-0 items-center gap-[2px]"
                                        aria-label={`${testimonial.rating} out of 5 stars`}
                                    >
                                        {Array.from({
                                            length: testimonial.rating,
                                        }).map((_, index) => (
                                            <Star
                                                key={index}
                                                size={13}
                                                strokeWidth={1}
                                                fill="#D7C2A3"
                                                className="shrink-0 text-[#D7C2A3]"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Testimonial quote text */}
                                <div className="pt-6">
                                    <p className="text-[15px] sm:text-[16px] font-normal leading-[1.65] tracking-tight text-[#171717]">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                </div>
                            </div>

                            {/* Card Bottom: Client profile stuck firmly to the bottom */}
                            <div className="mt-auto flex shrink-0 items-center gap-4 border-t border-[#dedede] bg-white p-6 px-7 transition-colors duration-200 group-hover:bg-[#fafafa] sm:p-7 md:px-9">
                                <Avatar className="h-[48px] w-[48px] size-12 shrink-0 border border-neutral-200/90 shadow-2xs">
                                    <AvatarImage
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-neutral-100 text-[13px] font-semibold text-neutral-800">
                                        {testimonial.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[15px] font-semibold leading-tight tracking-tight text-neutral-900">
                                        {testimonial.name}
                                    </p>

                                    <p className="mt-1 truncate text-[12px] font-normal leading-tight text-neutral-500">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
