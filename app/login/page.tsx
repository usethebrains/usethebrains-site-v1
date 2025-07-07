"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeProvider } from "@/components/theme/theme-provider";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Load mock data dynamically
      const [creatorData, studentData] = await Promise.all([
        import('@/data/creator.json'),
        import('@/data/student.json')
      ]);
      
      // Check credentials against mock data
      if (email === creatorData.default.email) {
        // Set auth cookie
        document.cookie = "auth=creator; path=/";
        localStorage.setItem('userRole', 'creator');
        setTimeout(() => {
          setIsLoading(false);
          router.push("/dashboard/creator");
        }, 1000);
        return;
      }
      
      if (email === studentData.default.email) {
        // Set auth cookie
        document.cookie = "auth=student; path=/";
        localStorage.setItem('userRole', 'student');
        setTimeout(() => {
          setIsLoading(false);
          router.push("/dashboard/student");
        }, 1000);
        return;
      }
      
      throw new Error("Invalid credentials");
    } catch (error) {
      setIsLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Link href="/" className="text-2xl font-bold">
                usethebrains
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
            <DemoAccountInfo />
          </CardFooter>
        </Card>
      </div>
    </ThemeProvider>
  );
}

function DemoAccountInfo() {
  const [emails, setEmails] = useState({ creator: '', student: '' });

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const [creatorData, studentData] = await Promise.all([
          import('@/data/creator.json'),
          import('@/data/student.json')
        ]);
        setEmails({
          creator: creatorData.default.email,
          student: studentData.default.email
        });
      } catch (error) {
        console.error('Error loading demo account info:', error);
      }
    };
    loadEmails();
  }, []);

  return (
    <div className="text-center text-xs text-muted-foreground">
      Demo Accounts:<br />
      Creator: {emails.creator}<br />
      Student: {emails.student}<br />
      (Any password will work)
    </div>
  );
}