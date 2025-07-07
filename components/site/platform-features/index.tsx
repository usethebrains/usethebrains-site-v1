"use client";

import Link from 'next/link';
import { BookOpen, Star, GraduationCap, Users, HelpCircle, ArrowRight, Code2, Palette, LineChart, Layout, Smartphone } from 'lucide-react';

export default function PlatformFeatures() {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-4 md:px-8 pb-10">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Typography */}
        <div className="animate-slide-up delay-600">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#004be0]" />
            <h2 className="text-lg font-semibold tracking-tight text-[#7f858e]">Explore Our Platform</h2>
          </div>
          <p className="text-4xl font-medium text-white tracking-tight mt-3">
            Transforming Ideas Into Reality
          </p>
          <p className="leading-6 text-sm text-[#7f858e] mt-6">
            We specialize in creating innovative digital solutions that help businesses and individuals achieve their goals. From web development to mobile apps, AI integration to cloud computing, we have the expertise to bring your vision to life.
          </p>
          <div className="mt-8 space-y-5">
            <Link href="/courses" className="flex items-center gap-3 text-[#004be0] font-medium hover:underline hover:text-[#0039b3] transition-colors">
              <GraduationCap className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">Explore Our Courses</div>
                <p className="text-sm text-[#7f858e]">Browse our catalog of professional courses</p>
              </div>
              <ArrowRight className="ml-auto w-5 h-5" />
            </Link>
            
            <Link href="/dashboard/community" className="flex items-center gap-3 text-[#004be0] font-medium hover:underline hover:text-[#0039b3] transition-colors">
              <Users className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">Join Our Community</div>
                <p className="text-sm text-[#7f858e]">Connect with other learners and professionals</p>
              </div>
              <ArrowRight className="ml-auto w-5 h-5" />
            </Link>
            
            <Link href="/help" className="flex items-center gap-3 text-[#004be0] font-medium hover:underline hover:text-[#0039b3] transition-colors">
              <HelpCircle className="w-5 h-5" />
              <div className="flex-1">
                <div className="font-medium">Help Center</div>
                <p className="text-sm text-[#7f858e]">Find answers to your questions</p>
              </div>
              <ArrowRight className="ml-auto w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Color Palette */}
        <div className="animate-slide-up delay-700">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-[#004be0]" />
            <h2 className="text-lg font-semibold tracking-tight text-[#7f858e]">What We Offer</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 h-full">
            <div className="rounded-xl border p-4 bg-gradient-to-br from-[#09090B] to-[#13131f] shadow-md hover:shadow-lg transition-all border-white/10 flex flex-col h-full group hover:border-[#004be0]/30">
              <div className="bg-[#004be0]/10 w-8 h-8 rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#004be0]/20 transition-colors">
                <div className="text-[#004be0]">
                  <Code2 className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-medium text-white mb-1 text-base">Web Development</h3>
              <p className="text-xs text-[#7f858e] flex-1">Custom websites and web applications built with the latest technologies.</p>
            </div>
            <div className="rounded-xl border p-4 bg-gradient-to-br from-[#09090B] to-[#13131f] shadow-md hover:shadow-lg transition-all border-white/10 flex flex-col h-full group hover:border-[#004be0]/30">
              <div className="bg-[#004be0]/10 w-8 h-8 rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#004be0]/20 transition-colors">
                <div className="text-[#004be0]">
                  <Smartphone className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-medium text-white mb-1 text-base">Mobile Apps</h3>
              <p className="text-xs text-[#7f858e] flex-1">Native and cross-platform mobile applications for iOS and Android.</p>
            </div>
            <div className="rounded-xl border p-4 bg-gradient-to-br from-[#09090B] to-[#13131f] shadow-md hover:shadow-lg transition-all border-white/10 flex flex-col h-full group hover:border-[#004be0]/30">
              <div className="bg-[#004be0]/10 w-8 h-8 rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#004be0]/20 transition-colors">
                <div className="text-[#004be0]">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-medium text-white mb-1 text-base">AI Solutions</h3>
              <p className="text-xs text-[#7f858e] flex-1">Intelligent systems that learn and adapt to your business needs.</p>
            </div>
            <div className="rounded-xl border p-4 bg-gradient-to-br from-[#09090B] to-[#13131f] shadow-md hover:shadow-lg transition-all border-white/10 flex flex-col h-full group hover:border-[#004be0]/30">
              <div className="bg-[#004be0]/10 w-8 h-8 rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#004be0]/20 transition-colors">
                <div className="text-[#004be0]">
                  <Layout className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-medium text-white mb-1 text-base">Cloud Computing</h3>
              <p className="text-xs text-[#7f858e] flex-1">Scalable infrastructure solutions for growing businesses.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}