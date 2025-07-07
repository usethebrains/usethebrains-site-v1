"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Book,
  FileText,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Users,
  Globe,
  BookOpen,
  GraduationCap,
  CreditCard,
  Settings,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  {
    title: "Getting Started",
    icon: Book,
    articles: [
      { title: "Creating your account", href: "/help/articles/creating-account" },
      { title: "Platform overview", href: "/help/articles/platform-overview" },
      { title: "Course enrollment", href: "/help/articles/course-enrollment" },
      { title: "System requirements", href: "/help/articles/system-requirements" },
      { title: "Mobile app guide", href: "/help/articles/mobile-app" },
    ],
  },
  {
    title: "Account & Billing",
    icon: CreditCard,
    articles: [
      { title: "Managing your subscription", href: "/help/articles/subscription" },
      { title: "Payment methods", href: "/help/articles/payment-methods" },
      { title: "Refund policy", href: "/help/articles/refund-policy" },
      { title: "Billing FAQ", href: "/help/articles/billing-faq" },
      { title: "Subscription plans", href: "/help/articles/subscription-plans" },
    ],
  },
  {
    title: "Learning",
    icon: GraduationCap,
    articles: [
      { title: "Accessing courses", href: "/help/articles/accessing-courses" },
      { title: "Progress tracking", href: "/help/articles/progress-tracking" },
      { title: "Certificates", href: "/help/articles/certificates" },
      { title: "Taking quizzes", href: "/help/articles/quizzes" },
      { title: "Course completion", href: "/help/articles/completion" },
    ],
  },
  {
    title: "Technical Support",
    icon: Settings,
    articles: [
      { title: "Browser compatibility", href: "/help/articles/browsers" },
      { title: "Video playback issues", href: "/help/articles/video-issues" },
      { title: "Download troubleshooting", href: "/help/articles/downloads" },
      { title: "Mobile app support", href: "/help/articles/mobile-support" },
    ],
  },
  {
    title: "Community",
    icon: Users,
    articles: [
      { title: "Discussion guidelines", href: "/help/articles/guidelines" },
      { title: "Reporting issues", href: "/help/articles/reporting" },
      { title: "Mentor program", href: "/help/articles/mentors" },
      { title: "Study groups", href: "/help/articles/study-groups" },
    ],
  },
  {
    title: "Security & Privacy",
    icon: Shield,
    articles: [
      { title: "Account security", href: "/help/articles/security" },
      { title: "Privacy policy", href: "/help/articles/privacy" },
      { title: "Data protection", href: "/help/articles/data-protection" },
      { title: "Two-factor authentication", href: "/help/articles/2fa" },
    ],
  },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your email address and follow the instructions sent to your inbox. For security reasons, password reset links expire after 24 hours.",
  },
  {
    question: "Can I download course content for offline viewing?",
    answer: "Yes, premium subscribers can download course videos and materials for offline access through our mobile app. Downloaded content remains available for 30 days and can be renewed by connecting to the internet.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers in select countries. For corporate accounts, we also offer invoice-based payments.",
  },
  {
    question: "How do I get a refund?",
    answer: "We offer a 30-day money-back guarantee on all course purchases. Contact our support team with your order details to process your refund. Refunds typically process within 5-7 business days.",
  },
  {
    question: "How long do I have access to a course?",
    answer: "Once enrolled, you have lifetime access to the course content, including any future updates. This applies to both free and paid courses in your library.",
  },
  {
    question: "Are certificates provided upon course completion?",
    answer: "Yes, you'll receive a digital certificate of completion for each course you finish successfully. Certificates include a unique verification ID and can be shared directly to LinkedIn or downloaded as PDF.",
  },
  {
    question: "Can I transfer my subscription to someone else?",
    answer: "Individual subscriptions cannot be transferred. However, we offer gift subscriptions and corporate accounts that can be managed and reassigned as needed.",
  },
  {
    question: "What happens if a course is updated?",
    answer: "You automatically get access to all course updates and improvements. We'll notify you when significant updates are available for courses you're enrolled in.",
  },
];

const supportHours = {
  email: {
    hours: "24/7",
    response: "Within 24 hours",
    priority: "Within 4 hours for premium members",
  },
  phone: {
    hours: "Monday-Friday: 9:00 AM - 8:00 PM EST\nSaturday: 10:00 AM - 6:00 PM EST",
    response: "Immediate",
  },
  chat: {
    hours: "24/7 for premium members\nMonday-Friday: 9:00 AM - 6:00 PM EST for standard members",
    response: "Average wait time: 2 minutes",
  },
};

const officeLocations = [
  {
    city: "New York",
    address: "123 Learning Street, NY 10001",
    phone: "+1 (212) 555-0123",
  },
  {
    city: "London",
    address: "456 Education Lane, London EC1A 1BB",
    phone: "+44 20 7123 4567",
  },
  {
    city: "Singapore",
    address: "789 Knowledge Road, Singapore 018956",
    phone: "+65 6789 0123",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("help-center");

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.articles.length > 0);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">How can we help?</h1>
            <p className="text-muted-foreground">
              Search our help center or browse common topics below
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="help-center">Help Center</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
            </TabsList>

            <TabsContent value="help-center" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <category.icon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <li key={articleIndex}>
                            <Link
                              href={article.href}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {article.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="faqs" className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Choose the best way to get in touch with our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Email Support</h3>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium">support@usethebrains.io</p>
                        <p className="text-xs text-muted-foreground">Available {supportHours.email.hours}</p>
                        <p className="text-xs text-muted-foreground">Response time: {supportHours.email.response}</p>
                        <p className="text-xs text-primary">{supportHours.email.priority}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Send Email
                      </Button>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Live Chat</h3>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium">Chat with our support team</p>
                        <p className="text-xs text-muted-foreground whitespace-pre-line">{supportHours.chat.hours}</p>
                        <p className="text-xs text-muted-foreground">{supportHours.chat.response}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Start Chat
                      </Button>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Phone Support</h3>
                      </div>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium">1-800-LEARN (1-800-532-76)</p>
                        <p className="text-xs text-muted-foreground whitespace-pre-line">{supportHours.phone.hours}</p>
                        <p className="text-xs text-muted-foreground">Response: {supportHours.phone.response}</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        Call Now
                      </Button>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Office Locations</h3>
                      </div>
                      <div className="mt-2 space-y-3">
                        {officeLocations.map((office, index) => (
                          <div key={index} className="space-y-1">
                            <p className="text-sm font-medium">{office.city}</p>
                            <p className="text-xs text-muted-foreground">{office.address}</p>
                            <p className="text-xs text-muted-foreground">{office.phone}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2">
                      <LifeBuoy className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Additional Resources</h3>
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <Button variant="outline" className="justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Documentation
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Community Forums
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        API Reference
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Video Tutorials
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}