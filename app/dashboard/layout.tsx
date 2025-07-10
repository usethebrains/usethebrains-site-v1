"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  ChevronDown, 
  Clock3, 
  Download, 
  FileText, 
  Folder, 
  History, 
  LayoutDashboard, 
  Layers, 
  LifeBuoy, 
  Menu, 
  MessageSquare, 
  Settings, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ThemeToggle from "@/components/theme/theme-toggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import UserNav from "@/components/navigation/user-nav";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { type StudentUser, type CreatorUser } from "@/lib/data";

interface NavSection {
  title: string;
  items: {
    title: string;
    href: string;
    icon: typeof LayoutDashboard;
  }[];
}

const getNavSections = (role: 'student' | 'creator'): NavSection[] => {
  if (role === 'creator') {
    return [
      {
        title: "Main",
        items: [
          {
            title: "Dashboard",
            href: "/dashboard/creator",
            icon: LayoutDashboard,
          },
          {
            title: "My Courses",
            href: "/dashboard/courses",
            icon: Layers,
          },
          {
            title: "Community",
            href: "/dashboard/community",
            icon: Users,
          }
        ]
      },
      {
        title: "Resources",
        items: [
          {
            title: "Calendar",
            href: "/dashboard/calendar",
            icon: Calendar,
          },
          {
            title: "Files",
            href: "/dashboard/files",
            icon: FileText,
          },
          {
            title: "Downloads",
            href: "/dashboard/downloads",
            icon: Download,
          }
        ]
      }
    ];
  }

  return [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard/student",
          icon: LayoutDashboard,
        },
        {
          title: "My Learning",
          href: "/dashboard/student",
          icon: BookOpen,
        },
        {
          title: "Community",
          href: "/dashboard/community",
          icon: Users,
        }
      ]
    },
    {
      title: "Learning",
      items: [
        {
          title: "In Progress",
          href: "/dashboard/student?status=in-progress",
          icon: Clock3,
        },
        {
          title: "Completed",
          href: "/dashboard/student?status=completed",
          icon: History,
        },
        {
          title: "Bookmarked",
          href: "/dashboard/student?status=bookmarked",
          icon: BookOpen,
        }
      ]
    }
  ];
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string>("Main");
  const [user, setUser] = useState<StudentUser | CreatorUser | null>(null);
  
  const role: 'student' | 'creator' = pathname.includes('/dashboard/creator') ? 'creator' : 'student';
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = role === 'creator' 
          ? (await import('@/data/creator.json')).default as CreatorUser
          : (await import('@/data/student.json')).default as StudentUser;
        setUser(userData);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, [role]);
  
  if (!user) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }
  
  const navSections = getNavSections(user.role as 'student' | 'creator');

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              <div className="flex items-center gap-4">
                <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-56 p-0">
                    <div className="grid gap-4 p-4">
                      <Link
                        href="/"
                        className="flex items-center gap-2 font-bold"
                        onClick={() => setIsMobileNavOpen(false)}
                      >
                        usethebrains
                      </Link>
                      <nav className="grid gap-2">
                        {navSections.map((section) => (
                          <div key={section.title} className="space-y-2">
                            <h4 className="text-sm font-medium text-muted-foreground px-2">
                              {section.title}
                            </h4>
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileNavOpen(false)}
                                className={cn(
                                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
                                  pathname === item.href ? "bg-muted" : "transparent"
                                )}
                              >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
                <Link href={user.role === 'creator' ? "/dashboard/creator" : "/dashboard/student"} className="font-bold hidden md:block">
                  usethebrains
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <UserNav />
              </div>
            </div>
          </header>
          <div className="flex flex-1">
            <aside 
              className={cn(
                "fixed left-0 top-14 bottom-0 z-30 hidden md:block border-r bg-background transition-all duration-300 ease-in-out",
                isSidebarCollapsed ? "w-12" : "w-56"
              )}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-end p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="h-6 w-6"
                  >
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 transition-transform duration-200",
                        isSidebarCollapsed ? "-rotate-90" : "rotate-0"
                      )}
                    />
                  </Button>
                </div>
                <nav className="flex-1 space-y-2 p-2">
                  {navSections.map((section) => (
                    <div key={section.title}>
                      {!isSidebarCollapsed && (
                        <Collapsible
                          open={expandedSection === section.title}
                          onOpenChange={() => setExpandedSection(section.title)}
                        >
                          <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                            {section.title}
                            <ChevronDown className={cn(
                              "h-3 w-3 transition-transform duration-200",
                              expandedSection === section.title ? "rotate-180" : "rotate-0"
                            )} />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-1 pt-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
                                  pathname === item.href ? "bg-muted" : "transparent"
                                )}
                              >
                                <item.icon className="h-4 w-4 shrink-0" />
                                <span className="truncate text-xs">{item.title}</span>
                              </Link>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                      {isSidebarCollapsed && (
                        <div className="space-y-1">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-muted",
                                pathname === item.href ? "bg-muted" : "transparent"
                              )}
                              title={item.title}
                            >
                              <item.icon className="h-4 w-4" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="p-2">
                  <Link
                    href="/dashboard/settings"
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
                      pathname === "/dashboard/settings" ? "bg-muted" : "transparent",
                      isSidebarCollapsed && "justify-center p-2"
                    )}
                    title={isSidebarCollapsed ? "Settings" : undefined}
                  >
                    <Settings className="h-4 w-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate text-xs">Settings</span>}
                  </Link>
                  <Link
                    href="/help"
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
                      pathname === "/help" ? "bg-muted" : "transparent",
                      isSidebarCollapsed && "justify-center p-2"
                    )}
                    title={isSidebarCollapsed ? "Help & Support" : undefined}
                  >
                    <LifeBuoy className="h-4 w-4 shrink-0" />
                    {!isSidebarCollapsed && <span className="truncate text-xs">Help & Support</span>}
                  </Link>
                </div>
              </div>
            </aside>
            <main className={cn(
              "flex-1 transition-all duration-300 ease-in-out",
              "md:ml-56",
              isSidebarCollapsed && "md:ml-12"
            )}>
              {children}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}