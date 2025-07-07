"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  LayoutDashboard,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserData, useUserCourses, getUserData, type StudentUser } from "@/lib/data";

export default function StudentDashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("enrolled");
  const [sortBy, setSortBy] = useState("recent");
  
  const { data: user } = useUserData('student') as { data: StudentUser | null };
  const { courses: enrolledCourses, isLoading } = useUserCourses();
  const stats = user?.learning_stats || {
    total_courses_enrolled: 0,
    courses_completed: 0,
    total_learning_hours: 0,
    streak_days: 0,
    certificates_earned: 0,
    average_rating_given: 0
  };
  const preferences = user?.preferences || {};

  const filteredCourses = (enrolledCourses || []).filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.last_accessed || '').getTime() - new Date(a.last_accessed || '').getTime();
      case 'progress':
        return (b.progress || 0) - (a.progress || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Learning</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.first_name}! Continue your learning journey.
            </p>
          </div>
          <Link href="/courses">
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Courses
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Enrolled Courses
              </CardTitle>
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.total_courses_enrolled}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.courses_completed} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Hours
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_learning_hours}</div>
              <p className="text-xs text-muted-foreground">
                {stats.streak_days} day streak
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Certificates
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.certificates_earned}</div>
              <p className="text-xs text-muted-foreground">
                View achievements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.average_rating_given}/5</div>
              <p className="text-xs text-muted-foreground">
                Course ratings given
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Accessed</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="enrolled" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="enrolled">My Courses</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <Card key={course.id} className="flex flex-col">
                    <div className="aspect-video relative">
                      <Image
                        src={course.thumbnail_url}
                        alt={course.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {course.level}
                        </Badge>
                        {course.progress === 100 && (
                          <Badge variant="secondary">Completed</Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{course.progress || 0}%</span>
                          </div>
                          <Progress value={course.progress || 0} className="mt-2" />
                        </div>
                        
                        {course.current_module && (
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Current Module:</p>
                            <p className="text-sm font-medium">{course.current_module}</p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {course.duration?.blended}
                          </div>
                          {course.last_accessed && (
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              Last accessed {new Date(course.last_accessed).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/courses/${course.id}`} className="w-full">
                        <Button className="w-full">
                          {course.progress === 0 ? "Start Learning" : "Continue Learning"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}

                {filteredCourses.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <div className="mx-auto w-full max-w-sm space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">No courses found</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeTab === "enrolled" 
                            ? "You haven't enrolled in any courses yet. Browse our catalog to get started!"
                            : "No courses match your search criteria. Try adjusting your filters."}
                        </p>
                      </div>
                      {activeTab === "enrolled" && (
                        <Button asChild>
                          <Link href="/courses">Browse Courses</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}