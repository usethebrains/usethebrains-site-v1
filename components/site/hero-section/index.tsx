"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 md:px-8 animate-slide-up delay-200">
      <div className="rounded-3xl overflow-hidden shadow-xl border grid md:grid-cols-2 hover:shadow-2xl transition-all duration-500 bg-[#09090B] border-white/10">
        {/* Copy */}
        <div className="p-8 sm:p-12 lg:p-16">
          <div className="animate-slide-up delay-300">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-white font-medium tracking-tight">
              Unleashing<br />Africa's<br />Potential
            </h1>
          </div>
          <div className="animate-slide-up delay-400">
            <p className="mt-6 text-[#7f858e] max-w-md text-lg leading-relaxed">
              At usethebrains, we're all about transforming ideas into digital realities, crafting innovative solutions that bridge the gap between imagination and execution.
            </p>
            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4 animate-slide-up delay-500">
              <Link href="/register" className="shiny-cta">
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Get Started
                </span>
              </Link>

              <Link href="#" className="flex items-center gap-2 border rounded-full px-5 py-3 text-sm shadow-xs hover:shadow-md transition-all duration-200 bg-white text-[#09090B] border-white hover:bg-opacity-90">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative bg-[#004be0] overflow-hidden">
          {/* Portfolio Card */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 backdrop-blur-xs rounded-2xl p-4 text-xs shadow-lg border flex flex-col gap-1 hover:shadow-xl transition-all duration-300 bg-[#09090B]/90 border-white/10">
            <div className="flex items-center gap-2">
              <ArrowRight className="w-3 h-3 text-[#004be0]" />
              <span className="text-[10px] uppercase tracking-widest text-[#7f858e] font-medium">Digital Solutions</span>
            </div>
            <span className="font-medium text-white text-lg">Web Development</span>
            <div className="flex justify-between text-[10px] text-[#7f858e]">
              <span>Mobile Apps</span>
              <span className="flex items-center gap-1 font-medium text-[#004be0]">
                <ArrowRight className="w-2 h-2" />
                <span>AI Solutions</span>
              </span>
            </div>
          </div>

          {/* Additional Stats Card */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 backdrop-blur-xs rounded-2xl p-3 text-xs shadow-lg border hover:shadow-xl transition-all duration-300 bg-[#09090B]/90 border-white/10">
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-[#004be0]" />
              <span className="text-[10px] uppercase tracking-widest text-[#7f858e] font-medium">Client Satisfaction</span>
            </div>
            <span className="font-medium text-sm text-[#004be0]">98% Positive</span>
          </div>

          {/* Main Visual */}
          <div className="relative z-10 w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center">
            <Image
              src="/assets/group.png"
              alt="usethebrains technologies"
              width={600}
              height={400}
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}