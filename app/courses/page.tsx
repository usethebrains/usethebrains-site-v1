"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import {
  Clock,
  GraduationCap,
  Search,
  Users,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  level: string;
  duration: {
    blended: string;
    video: string;
    text: string;
  };
  instructor: {
    first_name: string;
    last_name: string;
  };
  enrolled_count: number;
  rating: number;
  review_count: number;
  is_free: boolean;
  price: number;
  category: string;
}

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const CATEGORIES = ["Web Development", "Design", "Data Science", "Cloud Computing"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Chinese"];
const FORMATS = ["Video", "Text", "Interactive"];
const PRICE_RANGES = [
  { label: "Free", min: 0, max: 0 },
  { label: "$0-$50", min: 0, max: 50 },
  { label: "$50-$100", min: 50, max: 100 },
  { label: "$100+", min: 100, max: null },
];

function CoursesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    level: searchParams.get("level") || "",
    category: searchParams.get("category") || "",
    language: searchParams.get("language") || "",
    format: searchParams.get("format") || "",
    priceRange: searchParams.get("priceRange") || "",
    rating: Number(searchParams.get("rating")) || 0,
    sort: searchParams.get("sort") || "popular",
    page: Number(searchParams.get("page")) || 1,
    itemsPerPage: Number(searchParams.get("itemsPerPage")) || 12,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await import('@/data/courses.json');
        let filteredCourses = response.default.courses || [];

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredCourses = filteredCourses.filter(course =>
            course.title.toLowerCase().includes(searchLower) ||
            course.description.toLowerCase().includes(searchLower) ||
            `${course.instructor.first_name} ${course.instructor.last_name}`.toLowerCase().includes(searchLower)
          );
        }

        if (filters.level) {
          filteredCourses = filteredCourses.filter(course =>
            course.level.toLowerCase() === filters.level.toLowerCase()
          );
        }

        if (filters.category) {
          filteredCourses = filteredCourses.filter(course =>
            course.category === filters.category
          );
        }

        if (filters.rating) {
          filteredCourses = filteredCourses.filter(course =>
            course.rating >= filters.rating
          );
        }

        if (filters.priceRange) {
          const range = PRICE_RANGES.find(r => r.label === filters.priceRange);
          if (range) {
            filteredCourses = filteredCourses.filter(course => {
              if (range.label === "Free") return course.is_free;
              if (range.max === null) return !course.is_free && course.price >= range.min;
              return !course.is_free && course.price >= range.min && course.price <= range.max;
            });
          }
        }

        switch (filters.sort) {
          case "popular":
            filteredCourses.sort((a, b) => b.enrolled_count - a.enrolled_count);
            break;
          case "rating":
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
          case "newest":
            filteredCourses.sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime());
            break;
          case "price-low":
            filteredCourses.sort((a, b) => {
              if (a.is_free) return -1;
              if (b.is_free) return 1;
              return a.price - b.price;
            });
            break;
          case "price-high":
            filteredCourses.sort((a, b) => {
              if (a.is_free) return 1;
              if (b.is_free) return -1;
              return b.price - a.price;
            });
            break;
        }

        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();

    const query = qs.stringify(filters, { skipNulls: true });
    router.push(`/courses${query ? `?${query}` : ''}`);
  }, [filters, router]);

  const totalPages = Math.ceil(courses.length / filters.itemsPerPage);
  const startIndex = (filters.page - 1) * filters.itemsPerPage;
  const endIndex = startIndex + filters.itemsPerPage;
  const displayedCourses = courses.slice(startIndex, endIndex);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      level: "",
      category: "",
      language: "",
      format: "",
      priceRange: "",
      rating: 0,
      sort: "popular",
      page: 1,
      itemsPerPage: 12,
    });
  };

  const CourseCard = ({ course }: { course: Course }) => {
    const getPriceDisplay = () => {
      if (course.is_free) {
        return <Badge variant="secondary">Free</Badge>;
      }
      return <Badge variant="secondary">${course.price}</Badge>;
    };

    if (viewMode === "list") {
      return (
        <Card className="flex overflow-hidden">
          <div className="relative w-48 shrink-0">
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col flex-1">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge>{course.level}</Badge>
                {getPriceDisplay()}
              </div>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <GraduationCap className="mr-1 h-4 w-4" />
                  {course.instructor.first_name} {course.instructor.last_name}
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {course.enrolled_count} enrolled
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(course.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                      }`}
                  />
                ))}
                <span className="ml-1 text-sm text-muted-foreground">
                  ({course.review_count})
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/courses/${course.id}`} className="w-full">
                <Button className="w-full">
                  {course.is_free ? "Start Learning" : `Enroll for $${course.price}`}
                </Button>
              </Link>
            </CardFooter>
          </div>
        </Card>
      );
    }

    return (
      <Card>
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={course.thumbnail_url}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge>{course.level}</Badge>
            {getPriceDisplay()}
          </div>
          <CardTitle className="line-clamp-1">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <GraduationCap className="mr-1 h-4 w-4" />
              {course.instructor.first_name} {course.instructor.last_name}
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {course.enrolled_count} enrolled
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(course.rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                  }`}
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">
              ({course.review_count})
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/courses/${course.id}`} className="w-full">
            <Button className="w-full">
              {course.is_free ? "Start Learning" : `Enroll for $${course.price}`}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-background border-r overflow-y-auto transition-colors duration-300">
        <div className="space-y-6 p-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Level</h3>
                <div className="space-y-1">
                  {LEVELS.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={`level-${level}`}
                        checked={filters.level === level}
                        onCheckedChange={() =>
                          updateFilters({ level: filters.level === level ? "" : level })
                        }
                      />
                      <label
                        htmlFor={`level-${level}`}
                        className="text-sm hover:text-foreground transition-colors"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Category</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.category === category}
                        onCheckedChange={() =>
                          updateFilters({ category: filters.category === category ? "" : category })
                        }
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm hover:text-foreground transition-colors"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Rating</h3>
                <div className="pt-2">
                  <Slider
                    defaultValue={[filters.rating]}
                    max={5}
                    step={1}
                    onValueChange={([value]) => updateFilters({ rating: value })}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-muted-foreground">0</span>
                    <span className="text-sm text-muted-foreground">5</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">

                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="space-y-1">
                  {PRICE_RANGES.map((range) => (
                    <div key={range.label} className="flex items-center space-x-2">
                      <Checkbox
                        id={`price-${range.label}`}
                        checked={filters.priceRange === range.label}
                        onCheckedChange={() =>
                          updateFilters({ priceRange: filters.priceRange === range.label ? "" : range.label })
                        }
                      />
                      <label
                        htmlFor={`price-${range.label}`}
                        className="text-sm hover:text-foreground transition-colors"
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[280px]">
        <div className="container py-8 px-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Available Courses</h1>
                <p className="text-muted-foreground mt-1">
                  Explore our collection of professional courses
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? (
                  <LayoutList className="h-5 w-5" />
                ) : (
                  <LayoutGrid className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9"
                  value={filters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                />
              </div>

              <Select
                value={filters.sort}
                onValueChange={(value) => updateFilters({ sort: value })}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""}`}>
                {[...Array(filters.itemsPerPage)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <CardHeader>
                      <div className="h-4 w-3/4 bg-muted rounded" />
                      <div className="h-3 w-full bg-muted rounded" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""}`}>
                  {displayedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Select
                      value={String(filters.itemsPerPage)}
                      onValueChange={(value) =>
                        updateFilters({ itemsPerPage: Number(value), page: 1 })
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                          <SelectItem key={option} value={String(option)}>
                            {option} / page
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className="text-sm text-muted-foreground">
                      Showing {startIndex + 1}-{Math.min(endIndex, courses.length)} of{" "}
                      {courses.length} courses
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={filters.page === 1}
                      onClick={() =>
                        updateFilters({ page: Math.max(1, filters.page - 1) })
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Page {filters.page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={filters.page === totalPages}
                      onClick={() =>
                        updateFilters({ page: Math.min(totalPages, filters.page + 1) })
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CoursesPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoursesPage />
    </Suspense>
  );
}