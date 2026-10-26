import Hero from "@/app/components/Hero";
import AboutUs from "@/app/components/Aboutus";
import ProjectPage from "@/app/components/project";
import ServicesSection from "@/app/components/Service";
import Ourworks from "@/app/components/Ourworks";
import ClientStories from "@/app/components/Testimonials";
import FAQSection from "@/app/components/Faq";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-clip bg-white selection:bg-neutral-900 selection:text-white">
      <Hero />
      <AboutUs />
      <ProjectPage />
      <ServicesSection />
      <Ourworks />
      <ClientStories />
      <FAQSection />
      <Footer />
    </main>
  );
}
