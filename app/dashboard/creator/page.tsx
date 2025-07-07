"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ArrowUpRight, BookOpen, DollarSign, Users, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserData, useUserCourses, type CreatorUser, type EnrolledCourse, type CreatorCourse } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Dynamically import client components to avoid SSR issues
const DashboardChart = dynamic(() => import("@/components/dashboard/dashboard-chart"), {
  ssr: false,
  loading: () => <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
});

const RecentActivityList = dynamic(() => import("@/components/dashboard/recent-activity-list"), {
  ssr: false,
  loading: () => <div className="space-y-4">Loading activities...</div>
});

export default function CreatorDashboardPage() {
  const { data: user, isLoading } = useUserData('creator') as { data: CreatorUser | null; isLoading: boolean };
  const { courses: enrolledCourses } = useUserCourses();
  
  const [stats, setStats] = useState({
    total_students: 0,
    student_satisfaction: 0,
    total_courses: 0,
    total_teaching_hours: 0,
    total_reviews: 0,
    average_rating: 0
  });
  
  const [analytics, setAnalytics] = useState({
    monthly_revenue: {
      current: 0,
      growth: 0
    },
    student_engagement: {
      completion_rate: 0,
      average_watch_time: 0
    },
    popular_topics: [] as {name: string; students: number; rating: number}[]
  });
  
  const [createdCourses, setCreatedCourses] = useState<CreatorCourse[]>([]);

  useEffect(() => {
    if (user) {
      setStats(user.teaching_stats || {
        total_students: 0,
        student_satisfaction: 0,
        total_courses: 0,
        total_teaching_hours: 0,
        total_reviews: 0,
        average_rating: 0
      });
      
      setAnalytics(user.creator_analytics || {
        monthly_revenue: {
          current: 0,
          growth: 0
        },
        student_engagement: {
          completion_rate: 0,
          average_watch_time: 0
        },
        popular_topics: []
      });
      
      setCreatedCourses(user.courses || []);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Creator Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/courses/create">
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </Link>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_students?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.student_satisfaction || 0}% satisfaction rate
                </p>
                <div className="mt-4">
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                    View Details
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_courses || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total_teaching_hours || 0} teaching hours
                </p>
                <div className="mt-4">
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                    View All
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.monthly_revenue?.current?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground">
                  +{analytics.monthly_revenue?.growth || 0}% from last month
                </p>
                <div className="mt-4">
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                    View Report
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.average_rating || 0}/5.0</div>
                <p className="text-xs text-muted-foreground">
                  From {stats.total_reviews?.toLocaleString() || 0} reviews
                </p>
                <div className="mt-4">
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                    View Reviews
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Course engagement and revenue for the past 30 days.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest activities across your courses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivityList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Created Courses</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {createdCourses.map((course: CreatorCourse) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <Badge variant={course.status === "published" ? "default" : "secondary"}>
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Students</span>
                      <span>{course.students?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Revenue</span>
                      <span>${course.revenue?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rating</span>
                      <span>{course.rating || 0}/5</span>
                    </div>
                    {course.status === "draft" && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Completion</span>
                          <span>{course.completion || 0}%</span>
                        </div>
                        <Progress value={course.completion || 0} />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link href={`/dashboard/courses/${course.id}/edit`} className="w-full">
                      <Button className="w-full">
                        {course.status === "published" ? "Manage Course" : "Continue Editing"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enrolled Courses</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course: EnrolledCourse) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{course.progress || 0}%</span>
                    </div>
                    <Progress value={course.progress || 0} />
                    {course.current_module && (
                      <p className="text-sm text-muted-foreground">
                        Current: {course.current_module}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Link href={`/courses/${course.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Continue Learning
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>
                Detailed analytics for your courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Student Engagement</p>
                    <div className="grid gap-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span>{analytics.student_engagement?.completion_rate || 0}%</span>
                      </div>
                      <Progress value={analytics.student_engagement?.completion_rate || 0} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Watch Time</p>
                    <div className="grid gap-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Average</span>
                        <span>{analytics.student_engagement?.average_watch_time || 0}%</span>
                      </div>
                      <Progress value={analytics.student_engagement?.average_watch_time || 0} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Popular Topics</p>
                  <div className="space-y-2">
                    {(analytics.popular_topics || []).map((topic: any, index: number) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{topic.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {topic.students?.toLocaleString() || 0} students
                          </p>
                        </div>
                        <Badge variant="secondary">{topic.rating || 0}/5</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}