"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, HelpCircle, LifeBuoy, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GuidePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Student Guide</h1>
          <p className="text-muted-foreground">
            Welcome to usethebrains! This guide will help you get started with your learning journey.
          </p>
        </div>

        <Tabs defaultValue="access" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="access">Getting Started</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="access" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Accessing Your Account</CardTitle>
                <CardDescription>Follow these steps to access your courses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Step 1: Login</h3>
                  <p className="text-sm text-muted-foreground">
                    Visit <span className="font-mono bg-muted px-1 rounded">usethebrains.io/login</span> and enter your credentials:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 space-y-1">
                    <li>Email address</li>
                    <li>Password</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Step 2: Dashboard Access</h3>
                  <p className="text-sm text-muted-foreground">
                    After logging in, you'll be directed to your student dashboard where you can:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 space-y-1">
                    <li>View enrolled courses</li>
                    <li>Track your progress</li>
                    <li>Access course materials</li>
                    <li>View upcoming deadlines</li>
                  </ul>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">Having trouble logging in?</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try resetting your password or contact support if issues persist.
                  </p>
                </div>

                <Link href="/login">
                  <Button className="w-full">
                    Go to Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Navigating Your Courses</CardTitle>
                <CardDescription>Learn how to find and access course content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Accessing Course Content
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      From your dashboard:
                    </p>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground pl-4 space-y-2">
                      <li>Click on "My Learning" in the navigation menu</li>
                      <li>Select the course you want to access</li>
                      <li>Navigate through modules using the course sidebar</li>
                      <li>Track your progress with the completion indicators</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Participating in Discussions
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Engage with your peers:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 space-y-1">
                      <li>Access the discussion tab in your course</li>
                      <li>Post questions and respond to others</li>
                      <li>Follow important announcements</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Getting Help</CardTitle>
                <CardDescription>Support options and troubleshooting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Email Support</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      support@usethebrains.io
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Response within 24 hours
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Phone Support</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      1-800-LEARN (1-800-532-76)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Mon-Fri, 9AM-5PM EST
                    </p>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Help Center</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Visit our help center for detailed guides, FAQs, and troubleshooting steps.
                  </p>
                  <Button variant="link" className="mt-2 h-auto p-0">
                    Browse Help Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}