"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Article {
  title: string;
  lastUpdated: string;
  content: string;
}

const articles: Record<string, Article> = {
  "creating-account": {
    title: "Creating Your Account",
    lastUpdated: "2025-03-15",
    content: `
      <h2>Getting Started with LearnSphere</h2>
      <p>Creating an account on LearnSphere is quick and easy. Follow these steps to get started:</p>
      <ol>
        <li>Visit the registration page</li>
        <li>Enter your email address</li>
        <li>Choose a secure password</li>
        <li>Complete your profile information</li>
        <li>Verify your email address</li>
      </ol>
      <h3>Account Types</h3>
      <p>We offer different account types based on your needs:</p>
      <ul>
        <li>Student Account - For learners</li>
        <li>Instructor Account - For course creators</li>
        <li>Organization Account - For teams and institutions</li>
      </ul>
    `,
  },
  "platform-overview": {
    title: "Platform Overview",
    lastUpdated: "2025-03-14",
    content: `
      <h2>Welcome to LearnSphere</h2>
      <p>LearnSphere is your all-in-one learning platform. Here's what you need to know:</p>
      <h3>Key Features</h3>
      <ul>
        <li>Interactive courses</li>
        <li>Progress tracking</li>
        <li>Community discussions</li>
        <li>Certificates of completion</li>
      </ul>
      <h3>Navigation</h3>
      <p>The main sections of the platform include:</p>
      <ul>
        <li>Dashboard - Your learning hub</li>
        <li>Courses - Browse and access courses</li>
        <li>Community - Connect with other learners</li>
        <li>Profile - Manage your account</li>
      </ul>
    `,
  },
  // Add more articles as needed
};

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles[slug as string];

  if (!article) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-1">Article Not Found</h2>
              <p className="text-sm text-muted-foreground">
                The article you're looking for doesn't exist or has been moved.
              </p>
              <Link href="/help">
                <Button variant="outline" className="mt-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Help Center
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/help">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            Last updated {new Date(article.lastUpdated).toLocaleDateString()}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-6">
            <h3 className="font-medium mb-2">Was this article helpful?</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Yes
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsDown className="mr-2 h-4 w-4" />
                No
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="text-center">
          <p className="text-muted-foreground">
            Still need help?{" "}
            <Link href="/help?tab=contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}