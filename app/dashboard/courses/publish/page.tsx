"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ClipboardCheck, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CoursePublishPage() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [checklist, setChecklist] = useState({
    contentReviewed: false,
    thumbnailUploaded: false,
    pricingSet: false,
    previewEnabled: false,
  });

  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      router.push("/dashboard/courses");
    }, 2000);
  };

  const allChecksComplete = Object.values(checklist).every(Boolean);

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Publish Your Course</h1>
          <p className="text-muted-foreground mt-2">
            Complete these steps to make your course available to students
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Publication Checklist</CardTitle>
            <CardDescription>
              Ensure all requirements are met before publishing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  variant={checklist.contentReviewed ? "default" : "outline"}
                  onClick={() => setChecklist(c => ({ ...c, contentReviewed: !c.contentReviewed }))}
                >
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Content Review
                </Button>
                {checklist.contentReviewed && (
                  <span className="text-sm text-muted-foreground">
                    All modules and lessons reviewed
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant={checklist.thumbnailUploaded ? "default" : "outline"}
                  onClick={() => setChecklist(c => ({ ...c, thumbnailUploaded: !c.thumbnailUploaded }))}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Course Preview
                </Button>
                {checklist.thumbnailUploaded && (
                  <span className="text-sm text-muted-foreground">
                    Thumbnail and preview content set
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant={checklist.pricingSet ? "default" : "outline"}
                  onClick={() => setChecklist(c => ({ ...c, pricingSet: !c.pricingSet }))}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Pricing
                </Button>
                {checklist.pricingSet && (
                  <span className="text-sm text-muted-foreground">
                    Course pricing configured
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant={checklist.previewEnabled ? "default" : "outline"}
                  onClick={() => setChecklist(c => ({ ...c, previewEnabled: !c.previewEnabled }))}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Enrollment Settings
                </Button>
                {checklist.previewEnabled && (
                  <span className="text-sm text-muted-foreground">
                    Student enrollment enabled
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Course URL</Label>
              <div className="flex gap-2">
                <Input 
                  value="https://learnsphere.io/courses/web-development-bootcamp" 
                  readOnly 
                />
                <Button variant="outline">Copy</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This is the public URL where students can access your course
              </p>
            </div>

            {!allChecksComplete && (
              <Alert>
                <AlertTitle>Complete all checks</AlertTitle>
                <AlertDescription>
                  Please complete all items in the checklist before publishing your course.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              disabled={!allChecksComplete || isPublishing}
              onClick={handlePublish}
            >
              {isPublishing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Course"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}