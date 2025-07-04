import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-black text-white px-4">
      {/* Profile Photo */}
      <div className="mb-6">
        <Image
          src="assets/pragyan.jpg"
          alt="Pragyan Dhar"
          width={140}
          height={140}
          className="rounded-full border-4 border-red-600 shadow-lg"
        />
      </div>

      {/* Name with Tags */}
      <h1 className="text-4xl md:text-6xl font-bold mb-3">
        <span className="text-red-500">{`<`}</span>
        Pragyan Dhar
        <span className="text-red-500">{` />`}</span>
      </h1>

      {/* Typewriter Role */}
      <h2 className="text-lg md:text-2xl font-medium text-gray-400 mb-4">
        <Typewriter
          words={[
            "Data Analyst",
            "Dashboard Wizard",
            "Freelance Specialist",
            "Power BI Expert",
          ]}
          loop={Infinity}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </h2>

      {/* Description Paragraph */}
      <p className="max-w-xl text-gray-300 mb-8 px-4">
        I turn chaotic data into crystal-clear insights. From Excel sheets to
        dynamic dashboards, I help brands and businesses understand the story
        behind the numbers — and act on it fast. Your data’s not boring, it’s
        underutilized. Let's fix that.
      </p>

      {/* CTA */}
      <a
        href="#projects"
        className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
      >
        🚀 View My Work
      </a>
    </section>
  );
}
