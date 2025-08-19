"use client";

import Link from 'next/link';
import { BookOpen, LifeBuoy, GraduationCap, Code2, Palette, LineChart, Layout, Compass, Users, HelpCircle, Globe, ArrowRight } from 'lucide-react';

export default function PlatformLinks() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Courses Category */}
        <div className="bg-[#09090B] border border-white/10 rounded-xl p-6 hover:border-[#004be0]/30 transition-all">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#004be0]" />
            Courses
          </h3>
          <div className="space-y-3">
            <Link href="/courses?category=web-development" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <Code2 className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Web Development</span>
            </Link>
            <Link href="/courses?category=design" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <Palette className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Design</span>
            </Link>
            <Link href="/courses?category=business" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <LineChart className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Business</span>
            </Link>
            <Link href="/courses?category=data-science" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <Layout className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Data Science</span>
            </Link>
            <Link href="/courses" className="flex items-center text-[#004be0] font-medium hover:underline mt-2">
              <span>View all courses</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Resources Category */}
        <div className="bg-[#09090B] border border-white/10 rounded-xl p-6 hover:border-[#004be0]/30 transition-all">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-[#004be0]" />
            Resources
          </h3>
          <div className="space-y-3">
            <Link href="/learning-paths" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <Compass className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Learning Paths</span>
            </Link>
            <Link href="/help" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <HelpCircle className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Help Center</span>
            </Link>
            <Link href="/blog" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <BookOpen className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Blog</span>
            </Link>
            <Link href="/help" className="flex items-center text-[#004be0] font-medium hover:underline mt-2">
              <span>View all resources</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Community Category */}
        <div className="bg-[#09090B] border border-white/10 rounded-xl p-6 hover:border-[#004be0]/30 transition-all">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-[#004be0]" />
            Community
          </h3>
          <div className="space-y-3">
            <Link href="/community" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <Users className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Join Community</span>
            </Link>
            <Link href="/community/events" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <Globe className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Community Events</span>
            </Link>
            <Link href="/community/forums" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <BookOpen className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Discussion Forums</span>
            </Link>
            <Link href="/community/mentorship" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <GraduationCap className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Mentorship Program</span>
            </Link>
            <Link href="/community" className="flex items-center text-[#004be0] font-medium hover:underline mt-2">
              <span>Explore community</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* For Educators Category */}
        <div className="bg-[#09090B] border border-white/10 rounded-xl p-6 hover:border-[#004be0]/30 transition-all">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-[#004be0]" />
            For Educators
          </h3>
          <div className="space-y-3">
            <Link href="/teach" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <GraduationCap className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Become an Instructor</span>
            </Link>
            <Link href="/dashboard/courses" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <BookOpen className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Course Dashboard</span>
            </Link>
            <Link href="/dashboard/creator" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <Globe className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Creator Portal</span>
            </Link>
            <Link href="/dashboard/community" className="flex items-center text-[#7f858e] hover:text-white transition-colors">
              <Users className="h-4 w-4 mr-2 text-[#004be0]" />
              <span>Manage Communities</span>
            </Link>
            <Link href="/teach" className="flex items-center text-[#004be0] font-medium hover:underline mt-2">
              <span>Learn more about teaching</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}