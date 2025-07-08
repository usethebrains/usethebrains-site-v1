"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Info, Star, BookOpen, Smartphone, Menu, Users, LifeBuoy, Mail, GraduationCap, HelpCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function HeaderSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="max-w-7xl mx-auto mt-8 px-4 md:px-8 animate-fade-in w-full">
      <div className="backdrop-blur-lg rounded-3xl shadow-lg border flex items-center justify-between py-4 px-6 md:px-10 hover:shadow-xl transition-all duration-300 bg-[#09090B]/95 border-white/10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-[#004be0] flex items-center justify-center text-sm font-black group-hover:scale-105 transition-transform">
            <Image
              src="/usethebrains logo.png"
              alt="usethebrains logo"
              width={36}
              height={36}
              className="rounded-xl"
            />
          </div>
          <span className="font-semibold tracking-tight text-lg">usethebrains</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#" className="hover:text-[#004be0] transition-colors duration-200 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Features
          </Link>
          <Link href="#" className="hover:text-[#004be0] transition-colors duration-200 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Reviews
          </Link>
          <Link href="/courses" className="hover:text-[#004be0] transition-colors duration-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Courses
          </Link>
          <Link href="/help" className="hover:text-[#004be0] transition-colors duration-200 flex items-center gap-2">
            <LifeBuoy className="w-4 h-4" />
            Resources
          </Link>

          <Link href="/login">
            <button
              className="flex items-center gap-2 rounded-full px-5 py-3 text-sm shadow-sm hover:shadow-md transition-all duration-200 bg-[#004be0] text-white hover:bg-[#0039b3]"
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Login
              </span>
            </button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            id="menuBtn"
            className="flex items-center justify-center h-10 w-10 rounded-lg transition-colors duration-200 hover:bg-white/5"
            onClick={toggleMobileMenu}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        className={`md:hidden mt-4 backdrop-blur-lg rounded-2xl shadow-lg border divide-y overflow-hidden bg-[#09090B]/95 border-white/10 divide-white/5 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <Link href="#" className="flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors hover:bg-white/5">
          <Info className="w-4 h-4 text-[#004be0]" />
          Features
        </Link>
        <Link href="#" className="flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors hover:bg-white/5">
          <Star className="w-4 h-4 text-[#004be0]" />
          Reviews
        </Link>
        <Link href="/courses" className="flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors hover:bg-white/5">
          <BookOpen className="w-4 h-4 text-[#004be0]" />
          Courses
        </Link>
        <Link href="/help" className="flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors hover:bg-white/5">
          <LifeBuoy className="w-4 h-4 text-[#004be0]" />
          Help Center
        </Link>
        <Link href="#" className="flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors hover:bg-white/5">
          <Mail className="w-4 h-4 text-[#004be0]" />
          Contact
        </Link>
        <Link href="/login" className="flex items-center gap-3 px-6 py-4">
          <button
            className="flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm shadow-sm hover:shadow-md transition-all duration-200 bg-[#004be0] text-white hover:bg-[#0039b3] w-full"
          >
            <span className="flex items-center justify-center gap-2">
              <Smartphone className="w-4 h-4" />
              Login
            </span>
          </button>
        </Link>
        <Link href="/register" className="flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors hover:bg-white/5">
          <GraduationCap className="w-4 h-4 text-[#004be0]" />
          Register
        </Link>
      </nav>
    </header>
  );
}