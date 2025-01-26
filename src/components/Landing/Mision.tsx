import Image from "next/image";
import React from "react";
import { FiGlobe, FiUsers, FiZap } from "react-icons/fi";

const Mission = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-200 to-teal-100 py-24 px-6 md:px-16 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.svg')] bg-cover bg-center" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div className="relative space-y-8 z-10">
          <div className="relative pb-8">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Shaping the Future of AI in India
            </h2>
            <div className="absolute bottom-6 left-0 h-1 w-32 bg-gradient-to-r from-blue-400 to-teal-600 rounded-full animate-pulse" />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FiZap className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1 animate-pulse" />
              <p className="text-lg text-slate-700">
                Our mission is to unite India&apos;s brightest AI minds and
                foster a thriving community that will lead the AI revolution.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <FiUsers className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-700">
                Empower innovation and accelerate research through our
                nationwide AI network. We aim to build a robust infrastructure
                that supports cutting-edge development.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <FiGlobe className="w-8 h-8 text-teal-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-slate-700">
                Position India as the global AI hub through ethical frameworks
                and sustainable solutions that inspire worldwide adoption.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative group">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-300">
            <Image
              src="/images/india-ai-map.png"
              alt="AI Collaboration Map"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />

            {/* Animated connections */}
            <div className="absolute inset-0 bg-[url('/images/connection-lines.svg')] bg-contain bg-no-repeat animate-pulse opacity-50" />
          </div>

          {/* Floating Callout */}
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl w-64 border border-teal-50">
            <div className="text-teal-600 font-bold text-lg mb-2">
              &apos;Together, we can make India the global AI hub of
              tomorrow&apos;
            </div>
            <div className="h-1 bg-gradient-to-r from-teal-400 to-blue-400 mb-3 rounded-full" />
            <div className="flex items-center text-blue-600">
              <FiZap className="mr-2 animate-bounce" />
              <span className="font-medium">AI Revolution</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Separator */}
      <div className="absolute -bottom-1 left-0 right-0 w-full h-24 bg-[url('/images/wave-separator.svg')] bg-cover bg-no-repeat" />
    </section>
  );
};

export default Mission;
