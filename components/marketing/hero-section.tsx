import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Create, Sell & Manage Online Courses With Ease
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                A powerful, white-label LMS platform to build your online education business. Create courses, build communities, and generate revenue with our all-in-one solution.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href="/register">
                                <Button size="lg" className="w-full min-[400px]:w-auto">
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/demo">
                                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                                    Book a Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-muted/50">
                            {/* Placeholder for hero image or video */}
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                <div className="rounded-lg bg-card p-8 shadow-lg">
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 rounded bg-muted"></div>
                                        <div className="h-8 w-full rounded bg-muted"></div>
                                        <div className="h-4 w-24 rounded bg-muted"></div>
                                    </div>
                                    <div className="mt-6 space-y-2">
                                        <div className="h-12 w-full rounded bg-muted"></div>
                                        <div className="h-12 w-full rounded bg-muted"></div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <div className="h-10 w-24 rounded bg-primary"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}