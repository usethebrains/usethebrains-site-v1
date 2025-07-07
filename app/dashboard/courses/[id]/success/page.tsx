"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnrollmentSuccessPage() {
  const { id } = useParams();

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Enrollment Successful!</CardTitle>
          <CardDescription>
            Thank you for enrolling. You now have full access to the course.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-6">
            <h3 className="font-medium mb-2">Next Steps</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Check your email for enrollment confirmation</li>
              <li>• Download course materials and resources</li>
              <li>• Join the course community</li>
              <li>• Start your learning journey</li>
            </ul>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Course Materials
            </Button>
            <Link href={`/dashboard/courses/${id}`}>
              <Button>
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}