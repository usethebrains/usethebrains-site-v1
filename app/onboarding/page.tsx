"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Layers, 
  LayoutDashboard, 
  Loader2, 
  Target, 
  Users,
  Briefcase,
  Award,
  Globe,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const totalSteps = 3;
  const [userType, setUserType] = useState<'student' | 'creator'>('student');

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem('userRole') as 'student' | 'creator';
    if (storedRole) {
      setUserType(storedRole);
    }
  }, []);

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    setIsCompleting(true);
    // Simulate completing onboarding and redirect to appropriate dashboard
    setTimeout(() => {
      setIsCompleting(false);
      router.push(userType === 'creator' ? "/dashboard/creator" : "/dashboard/student");
    }, 1500);
  };

  const renderStudentSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Your Learning Goals</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>What's your primary learning goal?</Label>
                <RadioGroup defaultValue="career">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="career" id="career" />
                    <Label htmlFor="career">Career Development</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="skills" id="skills" />
                    <Label htmlFor="skills">Skill Enhancement</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="hobby" id="hobby" />
                    <Label htmlFor="hobby">Personal Interest</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="academic" id="academic" />
                    <Label htmlFor="academic">Academic Success</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Current Education Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Areas of Interest</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'AI/ML'].map((area) => (
                    <div key={area} className="flex items-center space-x-2 rounded-md border p-3">
                      <input type="checkbox" id={area} className="rounded border-gray-300" />
                      <Label htmlFor={area}>{area}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Learning Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Weekly Study Goal (hours)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select weekly hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">1-5 hours</SelectItem>
                    <SelectItem value="10">5-10 hours</SelectItem>
                    <SelectItem value="15">10-15 hours</SelectItem>
                    <SelectItem value="20">15+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Learning Style</Label>
                <RadioGroup defaultValue="visual">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="visual" id="visual" />
                    <Label htmlFor="visual">Visual (Videos & Diagrams)</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="reading" id="reading" />
                    <Label htmlFor="reading">Reading & Writing</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="interactive" id="interactive" />
                    <Label htmlFor="interactive">Interactive & Hands-on</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Preferred Study Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select study time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                    <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Learning Community</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Bio (Optional)</Label>
                <Textarea
                  placeholder="Tell your fellow learners about yourself..."
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  This will be visible on your profile to other students
                </p>
              </div>

              <div className="space-y-2">
                <Label>Learning Goals</Label>
                <Textarea
                  placeholder="What do you hope to achieve?"
                  rows={3}
                />
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Ready to start learning?</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll use your preferences to customize your learning experience and recommend relevant courses.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  const renderCreatorSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Professional Background</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Professional Title</Label>
                <Input placeholder="e.g., Senior Software Engineer, Design Instructor" />
              </div>

              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="4-6">4-6 years</SelectItem>
                    <SelectItem value="7-10">7-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Areas of Expertise</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Web Development',
                    'Mobile Development',
                    'UI/UX Design',
                    'Data Science',
                    'Machine Learning',
                    'Cloud Computing',
                    'DevOps',
                    'Cybersecurity'
                  ].map((area) => (
                    <div key={area} className="flex items-center space-x-2 rounded-md border p-3">
                      <input type="checkbox" id={area} className="rounded border-gray-300" />
                      <Label htmlFor={area}>{area}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Professional Bio</Label>
                <Textarea
                  placeholder="Share your professional experience and teaching philosophy..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Teaching Experience</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Teaching Style</Label>
                <RadioGroup defaultValue="practical">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="practical" id="practical" />
                    <Label htmlFor="practical">Practical & Project-based</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="theoretical" id="theoretical" />
                    <Label htmlFor="theoretical">Theoretical & Concept-focused</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="blended" id="blended" />
                    <Label htmlFor="blended">Blended Approach</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Previous Teaching Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic Institution</SelectItem>
                    <SelectItem value="corporate">Corporate Training</SelectItem>
                    <SelectItem value="online">Online Courses</SelectItem>
                    <SelectItem value="mentoring">Individual Mentoring</SelectItem>
                    <SelectItem value="none">No Previous Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Content Creation Experience</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <input type="checkbox" id="video" className="rounded border-gray-300" />
                    <Label htmlFor="video">Video Production</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <input type="checkbox" id="written" className="rounded border-gray-300" />
                    <Label htmlFor="written">Written Content</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <input type="checkbox" id="interactive" className="rounded border-gray-300" />
                    <Label htmlFor="interactive">Interactive Materials</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Course Planning</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Target Audience Level</Label>
                <RadioGroup defaultValue="beginner">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginners</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Planned Course Format</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <Label>Video Lectures</Label>
                    <input type="number" className="ml-auto w-20 rounded-md border" placeholder="Hours" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <Label>Written Content</Label>
                    <input type="number" className="ml-auto w-20 rounded-md border" placeholder="Hours" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <Label>Practical Exercises</Label>
                    <input type="number" className="ml-auto w-20 rounded-md border" placeholder="Hours" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Ready to start creating?</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll use your preferences to set up your creator dashboard and provide relevant resources for course creation.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-bold">usethebrains</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="container flex flex-col items-center justify-center py-10">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-center">
                  {userType === 'student' ? 
                    "Let's personalize your learning journey" : 
                    "Set up your creator profile"
                  }
                </h1>
                <p className="text-center text-muted-foreground mt-2">
                  {userType === 'student' ?
                    "We'll help you find the right courses and learning path" :
                    "We'll help you get started with creating engaging courses"
                  }
                </p>
                <div className="mt-6">
                  <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
                </div>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <Tabs value={`step-${currentStep}`}>
                    <TabsContent value={`step-${currentStep}`} className="mt-0 space-y-4">
                      {userType === 'student' ? renderStudentSteps() : renderCreatorSteps()}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  disabled={currentStep === 1 || isCompleting}
                >
                  Previous
                </Button>
                <Button onClick={goToNextStep} disabled={isCompleting}>
                  {isCompleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {userType === 'student' ? 'Setting up your profile...' : 'Creating your workspace...'}
                    </>
                  ) : currentStep === totalSteps ? (
                    userType === 'student' ? "Start Learning" : "Start Creating"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}