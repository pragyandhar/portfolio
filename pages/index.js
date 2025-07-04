import Head from "next/head";
import Hero from "@/components/Hero";
import SkillsPreview from "@/components/SkillsPreview";
import FeaturedProjects from "@/components/FeaturedProjects";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dhar | Data Analyst & Freelancer</title>
        <meta name="description" content="Portfolio of Dhar – Data Analytics Specialist & Freelance Pro" />
      </Head>

      <main className="bg-black text-white">
        {/* 🚀 Hero Section */}
        <Hero />

        {/* 🧠 Skills Preview */}
        <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-red-500">
            My Core Skills
          </h2>
          <SkillsPreview />
        </section>

        {/* 🎯 Featured Projects */}
        <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-red-500">
            Featured Projects
          </h2>
          <FeaturedProjects />
        </section>

        {/* 📬 CTA */}
        <section className="py-20 bg-gradient-to-br from-red-900 to-black text-center px-6">
          <ContactCTA />
        </section>
      </main>
    </>
  );
}
