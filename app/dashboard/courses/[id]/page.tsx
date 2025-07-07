import { Suspense } from "react";
import CourseContent from "./course-content";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function CoursePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-4 px-2">
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <h2 className="text-xl font-bold mb-1">Loading course content...</h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we load the course content.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <CourseContent />
    </Suspense>
  );
}