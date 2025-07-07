import Link from 'next/link';
import Image from 'next/image';
import { Smartphone } from 'lucide-react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import Footer from '@/components/site/footer';
import Tut from '@/components/site/tut';
import Bootcamps from "@/components/site/bootcamps";
import Review from '@/components/site/review';
import FeatHero from "@/components/site/featherro";
import Service from "@/components/site/service";
import HeaderSection from '@/components/site/header-section';
import HeroSection from '@/components/site/hero-section';
import PlatformFeatures from '@/components/site/platform-features';
import PlatformLinks from '@/components/site/platform-links';

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col bg-[#000000] text-[#ffffff]">
        <HeaderSection />
        <HeroSection />
        <PlatformFeatures />
        <PlatformLinks />

        {/* Dark sections */}
        <div className="bg-[#000000]">
          {/*
             <FeatHero/>
          <Service/>
          <Review/>
          <Bootcamps/>
          */}
          <Tut/>
          <Footer/>
        </div>
      </div>

    </ThemeProvider>
  );
}