"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { updateCourseProgress, type Course, type QuizContent } from "@/lib/data";
import { QuizBlock } from '@/components/course/quiz-block';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { 
  BookOpen,
  Clock,
  Edit,
  GraduationCap,
  Lock,
  Star,
  Users,
} from "lucide-react";

export default function CourseContent() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [course, setCourse] = useState<Course | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const progressStore = useProgressStore();
  const [progress, setProgress] = useState(0);
  
  const getCourseData = async (courseId: string) => {
    try {
      const coursesData = await import('@/data/courses.json');
      return coursesData.default.courses.find((course) => course.id === courseId) || null;
    } catch (error) {
      console.error('Error fetching course data:', error);
      return null;
    }
  };
  
  const checkAccess = async (courseId: string) => {
    try {
      const studentData = await import('@/data/student.json');
      return studentData.default.enrolled_courses.includes(courseId) || 
             studentData.default.purchased_courses.includes(courseId);
    } catch (error) {
      console.error('Error checking course access:', error);
      return false;
    }
  };

  useEffect(() => {
    const loadCourseData = async () => {
      if (id) {
        try {
          const courseId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
          const courseData = await getCourseData(courseId);
          setCourse(courseData);
          const access = await checkAccess(courseId);
          setHasAccess(access);
          setProgress(progressStore.getProgress(courseId));
        } catch (error) {
          console.error('Error fetching course data:', error);
        }
      }
    };

    loadCourseData();
  }, [id, progressStore]);

  if (!course) {
    return (
      <div className="container mx-auto py-4 px-2">
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-1">Course Not Found</h2>
              <p className="text-sm text-muted-foreground">
                The course you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge>{course.level}</Badge>
                <Badge variant="outline">
                  {course.is_free ? "Free" : `$${course.price}`}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground mt-2">{course.description}</p>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{course.enrolled_count}</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{course.rating}/5</p>
                      <p className="text-sm text-muted-foreground">{course.review_count} Reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{course.duration.blended}</p>
                      <p className="text-sm text-muted-foreground">Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {course.prerequisites.map((prerequisite: string, index: number) => (
                      <li key={index} className="text-muted-foreground">
                        {prerequisite}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              {course.content.modules.map((module: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Badge variant="outline">
                        {module.preview ? "Free Preview" : "Premium"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Learning Objectives</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {module.objectives.map((objective: string, i: number) => (
                            <li key={i} className="text-sm text-muted-foreground">
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Lessons</h4>
                        <div className="space-y-2">
                          {module.lessons.map((lesson: any, i: number) => (
                            <div
                              key={i}
                              className="flex items-center justify-between rounded-lg border p-3"
                            >
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                <span className="text-sm">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{lesson.duration}</Badge>
                                {!module.preview && !lesson.preview && (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Completion Rate</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} className="mt-2" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-2xl font-bold">{course.enrolled_count}</p>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">42</p>
                        <p className="text-sm text-muted-foreground">Active This Week</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">28</p>
                        <p className="text-sm text-muted-foreground">Completed Course</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{course.instructor.first_name} {course.instructor.last_name}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enrollment</span>
                  <Badge>{course.enrollment.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Available Seats</span>
                  <span className="font-medium">{course.enrollment.available_seats}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Deadline</span>
                  <span className="font-medium">
                    {new Date(course.enrollment.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}