"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CreateCourseForm } from "@/components/course-builder/create-course-form";

export default function EditCoursePage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const coursesData = await import('@/data/courses.json');
        const courseData = coursesData.default.courses.find((course: any) => course.id === params.id);
        if (!courseData) {
          router.push('/dashboard/courses');
          return;
        }
        setCourse(courseData);
      } catch (error) {
        console.error('Error loading course:', error);
        router.push('/dashboard/courses');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourse();
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-muted rounded"></div>
          <div className="h-4 w-1/2 bg-muted rounded"></div>
          <div className="h-[200px] bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-8 px-4">
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

  return <CreateCourseForm initialData={course} mode="edit" />;
}