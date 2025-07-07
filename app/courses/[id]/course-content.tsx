"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { updateCourseProgress, type Course, type QuizContent } from '@/lib/data';
import { QuizBlock } from '@/components/course/quiz-block';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, Lock, Star, Users, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useProgressStore } from '@/lib/store';

export default function CourseContent() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
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
          const courseData = await getCourseData(id as string);
          setCourse(courseData);
          const access = await checkAccess(id as string);
          setHasAccess(access);
          setProgress(progressStore.getProgress(id as string));
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
              <h2 className="text-xl font-bold mb-1">Loading course...</h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we load the course content.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentModule = course.content.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];
  const totalLessons = course.content.modules.reduce((total, module) => total + module.lessons.length, 0);

  const handleLessonComplete = () => {
    progressStore.updateProgress(
      course.id,
      currentModule.title,
      currentLesson.title
    );

    const allModuleLessonsComplete = currentModule.lessons.every((lesson) => 
      progressStore.progress[`${course.id}-${currentModule.title}-${lesson.title}`]?.completed
    );

    if (allModuleLessonsComplete) {
      progressStore.markModuleComplete(course.id, currentModule.title);
    }

    const newProgress = progressStore.getProgress(course.id);
    setProgress(newProgress);

    updateCourseProgress(course.id, newProgress);
  };

  const canAccessLesson = (moduleIndex: number, lessonIndex: number) => {
    if (course.is_free) return true;
    if (hasAccess) return true;
    
    const module = course.content.modules[moduleIndex];
    const lesson = module.lessons[lessonIndex];
    return module.preview || lesson.preview;
  };

  const navigateToLesson = (moduleIndex: number, lessonIndex: number) => {
    if (canAccessLesson(moduleIndex, lessonIndex)) {
      setCurrentModuleIndex(moduleIndex);
      setCurrentLessonIndex(lessonIndex);
    }
  };

  const navigateToPrevious = () => {
    if (currentLessonIndex > 0) {
      navigateToLesson(currentModuleIndex, currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      const prevModule = course.content.modules[currentModuleIndex - 1];
      navigateToLesson(currentModuleIndex - 1, prevModule.lessons.length - 1);
    }
  };

  const navigateToNext = () => {
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      navigateToLesson(currentModuleIndex, currentLessonIndex + 1);
    } else if (currentModuleIndex < course.content.modules.length - 1) {
      navigateToLesson(currentModuleIndex + 1, 0);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'quiz':
        return <Star className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const isLessonComplete = (moduleTitle: string, lessonTitle: string) => {
    return progressStore.progress[`${course.id}-${moduleTitle}-${lessonTitle}`]?.completed;
  };

  const isModuleComplete = (moduleTitle: string) => {
    return progressStore.progress[`${course.id}-${moduleTitle}`]?.completed;
  };

  const getPriceDisplay = () => {
    if (course.is_free) {
      return <Badge variant="secondary">Free Course</Badge>;
    }
    return <Badge variant="secondary">${course.price}</Badge>;
  };

  const renderLockedContent = () => (
    <div className="p-8 text-center">
      <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h2 className="text-xl font-bold mb-2">Premium Content</h2>
      <p className="text-muted-foreground mb-4">
        Enroll in this course to access all content and materials
      </p>
      <Link href={`/courses/${course.id}/enroll`}>
        <Button>
          {course.is_free ? "Enroll Now" : `Enroll for $${course.price}`}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Badge>{course.level}</Badge>
                {getPriceDisplay()}
              </div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>

            <div className="bg-card rounded-lg shadow-sm">
              {currentLesson?.type === "quiz" ? (
                canAccessLesson(currentModuleIndex, currentLessonIndex) ? (
                  <div className="p-6">
                    <QuizBlock
                      content={currentLesson.content as QuizContent}
                      onComplete={(result) => {
                        if (result.correct) {
                          handleLessonComplete();
                          navigateToNext();
                        }
                      }}
                    />
                  </div>
                ) : renderLockedContent()
              ) : currentLesson?.type === "video" ? (
                <div className="space-y-4">
                  <div className="aspect-video rounded-t-lg">
                    {canAccessLesson(currentModuleIndex, currentLessonIndex) ? (
                      <iframe
                        src={currentLesson.videoUrl}
                        className="w-full h-full rounded-t-lg"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-muted rounded-t-lg">
                        <div className="text-center">
                          <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="font-medium">Premium Content</h3>
                          <p className="text-sm text-muted-foreground">
                            Enroll to watch this video
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">{currentLesson.title}</h2>
                      {hasAccess && (
                        <Button
                          variant="outline"
                          onClick={handleLessonComplete}
                          disabled={isLessonComplete(currentModule.title, currentLesson.title)}
                        >
                          {isLessonComplete(currentModule.title, currentLesson.title) ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Completed
                            </>
                          ) : (
                            "Mark as Complete"
                          )}
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-b py-4">
                      <Button
                        variant="ghost"
                        onClick={navigateToPrevious}
                        disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        onClick={() => {
                          if (hasAccess) {
                            handleLessonComplete();
                          }
                          navigateToNext();
                        }}
                        disabled={
                          currentModuleIndex === course.content.modules.length - 1 &&
                          currentLessonIndex === currentModule.lessons.length - 1
                        }
                      >
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-bold">{currentLesson.title}</h2>
                  {canAccessLesson(currentModuleIndex, currentLessonIndex) ? (
                    <>
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: typeof currentLesson?.content === 'string' ? currentLesson.content : '' }} />
                      <div className="flex items-center justify-between border-t pt-4">
                        <Button
                          variant="ghost"
                          onClick={navigateToPrevious}
                          disabled={!currentModule || (currentModuleIndex === 0 && currentLessonIndex === 0)}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>
                        {hasAccess && (
                          <Button
                            variant="outline"
                            onClick={handleLessonComplete}
                            disabled={isLessonComplete(currentModule.title, currentLesson.title)}
                          >
                            {isLessonComplete(currentModule.title, currentLesson.title) ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Completed
                              </>
                            ) : (
                              "Mark as Complete"
                            )}
                          </Button>
                        )}
                        <Button
                          onClick={() => {
                            if (hasAccess) {
                              handleLessonComplete();
                            }
                            navigateToNext();
                          }}
                          disabled={
                            currentModuleIndex === course.content.modules.length - 1 &&
                            currentLessonIndex === currentModule.lessons.length - 1
                          }
                        >
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  ) : renderLockedContent()}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Overall Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>

                <div className="space-y-4">
                  {course.content.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium flex items-center gap-2">
                          {module.title}
                          {!course.is_free && module.preview && (
                            <Badge variant="secondary">Free Preview</Badge>
                          )}
                          {isModuleComplete(module.title) && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </h4>
                      </div>
                      <div className="space-y-1">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <button
                            key={lessonIndex}
                            className={`w-full flex items-center justify-between rounded-lg border p-2 text-left transition-colors ${
                              moduleIndex === currentModuleIndex &&
                              lessonIndex === currentLessonIndex
                                ? "bg-muted"
                                : "hover:bg-muted/50"
                            } ${
                              !canAccessLesson(moduleIndex, lessonIndex)
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            onClick={() => navigateToLesson(moduleIndex, lessonIndex)}
                            disabled={!canAccessLesson(moduleIndex, lessonIndex)}
                          >
                            <div className="flex items-center gap-2">
                              {getLessonIcon(lesson.type)}
                              <span className="text-sm">{lesson.title}</span>
                              {!course.is_free && lesson.preview && (
                                <Badge variant="secondary" className="text-xs">
                                  Preview
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{lesson.duration}</Badge>
                              {!canAccessLesson(moduleIndex, lessonIndex) ? (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              ) : isLessonComplete(module.title, lesson.title) ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : null}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {!hasAccess && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">
                        {course.is_free ? "Free" : `$${course.price}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {course.is_free ? "Start learning now" : "One-time payment"}
                      </p>
                    </div>
                    <Link href={`/courses/${course.id}/enroll`} className="block">
                      <Button className="w-full">
                        {course.is_free ? "Enroll Now" : "Purchase Course"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Full course access
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {course.duration.blended} of content
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Join {course.enrolled_count} students
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}