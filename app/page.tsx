import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
{/*import HeroSection from '@/components/site/hero-section';*/ }
import HeroSection from '@/components/marketing/hero-section';
import FeaturesSection from '@/components/marketing/features-section';
import TestimonialsSection from '@/components/marketing/testimonials-section';
import PricingSection from '@/components/marketing/pricing-section';
import { ThemeProvider } from '@/components/theme/theme-provider';
import MegaMenu from '@/components/navigation/mega-menu';
import TechClients from '@/components/ui/tech-clients';


import Footer from '@/components/site/footer';
import Tut from '@/components/site/tut';
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

      <div className="flex min-h-screen flex-col">
        {/*
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-6 md:gap-10">
              <Link href="/" className="flex items-center space-x-2">
                <span className="inline-block font-bold">usethebrains</span>
              </Link>
              <MegaMenu />
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2">
                <ThemeToggle />
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        </header>
        */}
        <main className="flex-1">
          {/**
           <HeroSection />
          <TechClients />
           */}
          <PlatformLinks />

          {/*
          <Tut />
        */}
          {/*<Footer />*/}
          {/** <PricingSection /> */}
        </main>
      </div>
    </ThemeProvider>
  );
}