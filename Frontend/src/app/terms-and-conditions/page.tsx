import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — FormT Studio",
  description: "Terms and conditions for FormT Studio architecture and interior design services.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-16 sm:px-6 md:px-10 lg:px-16 selection:bg-[#D7C2A3] selection:text-black">
      <div className="mx-auto max-w-[1200px]">
        {/* Navigation Back */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-[14px] font-medium text-neutral-300 hover:text-white transition-colors duration-200"
        >
          <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-[3px] bg-white p-0.5 shadow-sm">
            <Image
              src="/brand-logo.png"
              alt="FormT Studio brand logo"
              fill
              sizes="28px"
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-white">FormT Studio</span>
          <span className="text-neutral-500 flex items-center gap-1.5 ml-2">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </span>
        </Link>

        {/* Header */}
        <header className="mt-12 border-b border-neutral-800 pb-10">
          <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#D7C2A3]">
            <span className="h-1.5 w-1.5 bg-[#D7C2A3]" aria-hidden="true" />
            Legal Notice
          </p>
          <h1 className="mt-4 text-[clamp(2.25rem,4vw,3.5rem)] font-bold tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-[14px] text-neutral-400">
            Last updated: October 2026 · FormT Studio, Coimbatore, Tamil Nadu
          </p>
        </header>

        {/* Content */}
        <div className="mt-12 space-y-10 text-[15px] sm:text-[16px] leading-[1.7] text-neutral-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              1. Engagement &amp; Scope of Services
            </h2>
            <p>
              FormT Studio provides professional architectural design, interior design, renovation
              planning, 3D visualisations, and project coordination. All project deliverables, timelines,
              and phases are governed by individual project agreements signed between FormT Studio and the client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              2. Intellectual Property &amp; Design Ownership
            </h2>
            <p>
              All concepts, architectural sketches, 3D models, technical drawings, specifications, and
              photographs created by FormT Studio remain the intellectual property of FormT Studio unless
              expressly transferred in writing. Clients are granted a license to use final documentation
              solely for the specific site and project specified in their agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              3. Client Responsibilities
            </h2>
            <p>
              Clients are responsible for providing accurate site information, boundary demarcations,
              access to the premises, and timely approvals necessary to maintain agreed project schedules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">
              4. Contact &amp; Inquiries
            </h2>
            <p>
              For legal inquiries regarding these terms, please contact:
            </p>
            <div className="mt-3 rounded border border-neutral-800 bg-neutral-950 p-5 text-sm text-neutral-300">
              <p className="font-semibold text-white">FormT Studio</p>
              <p>2, Sarcarsamakulam, Kovilpalayam, Coimbatore, Tamil Nadu – 641107</p>
              <p className="mt-1">
                Email:{" "}
                <a href="mailto:formtstudio@gmail.com" className="text-[#D7C2A3] hover:underline">
                  formtstudio@gmail.com
                </a>
              </p>
              <p>Phone: +91 733-9423514</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
