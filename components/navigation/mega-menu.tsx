"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Book,
    BookOpen,
    Code2,
    Compass,
    GraduationCap,
    Layout,
    LifeBuoy,
    Lightbulb,
    LineChart,
    Palette,
    Users,
} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const courses = [
    {
        title: "Web Development",
        href: "/courses?category=web-development",
        description: "Learn modern web development with HTML, CSS, and JavaScript.",
        icon: Code2,
    },
    {
        title: "Design",
        href: "/courses?category=design",
        description: "Master UI/UX design principles and tools.",
        icon: Palette,
    },
    {
        title: "Business",
        href: "/courses?category=business",
        description: "Develop essential business and entrepreneurship skills.",
        icon: LineChart,
    },
    {
        title: "Data Science",
        href: "/courses?category=data-science",
        description: "Explore data analysis and machine learning.",
        icon: Layout,
    },
];

const resources = [
    {
        title: "Learning Paths",
        href: "/learning-paths",
        description: "Structured paths to achieve your learning goals.",
        icon: Compass,
    },
    {
        title: "Community",
        href: "/community",
        description: "Connect with other learners and educators.",
        icon: Users,
    },
    {
        title: "Help Center",
        href: "/help",
        description: "Get support and find answers to your questions.",
        icon: LifeBuoy,
    },
    {
        title: "Blog",
        href: "/blog",
        description: "Latest insights and learning resources.",
        icon: BookOpen,
    },
];

export default function MegaMenu() {
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                            >
                                <div className="col-span-2 grid grid-cols-4 gap-2">
                                    {courses.map((course) => (
                                        <Link key={course.href} href={course.href} legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={cn(
                                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                )}
                                            >
                                                <course.icon className="mb-2 h-6 w-6" />
                                                <div className="text-sm font-medium leading-none">{course.title}</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    {course.description}
                                                </p>
                                            </NavigationMenuLink>
                                        </Link>
                                    ))}
                                </div>
                                <div className="col-span-2">
                                    <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
                                        <Lightbulb className="h-6 w-6 text-primary" />
                                        <div>
                                            <h4 className="text-sm font-medium">New to usethebrains?</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Start with our beginner-friendly courses.{" "}
                                                <Link href="/getting-started" className="font-medium text-primary">
                                                    Learn more →
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                            >
                                <div className="grid gap-2">
                                    {resources.map((resource) => (
                                        <Link key={resource.href} href={resource.href} legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={cn(
                                                    "flex gap-2 select-none rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                )}
                                            >
                                                <resource.icon className="h-6 w-6" />
                                                <div className="text-sm font-medium leading-none">{resource.title}</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                    {resource.description}
                                                </p>
                                            </NavigationMenuLink>
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2 rounded-lg bg-muted p-4">
                                    <h4 className="font-medium">For Educators</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Create and manage your own courses on usethebrains.
                                    </p>
                                    <div className="mt-2 space-y-2">
                                        <Link href="/teach" legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={cn(
                                                    "flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                <GraduationCap className="h-4 w-4" />
                                                <span className="text-sm">Become an Instructor</span>
                                            </NavigationMenuLink>
                                        </Link>
                                        <Link href="/dashboard/courses" legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={cn(
                                                    "flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                <Book className="h-4 w-4" />
                                                <span className="text-sm">Course Dashboard</span>
                                            </NavigationMenuLink>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/pricing" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Pricing
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}