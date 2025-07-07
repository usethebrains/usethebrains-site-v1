"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Eye, MoreHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreatorCourses } from "@/lib/data";

interface Course {
  id: string;
  title: string;
  description: string;
  is_free: boolean;
  price: number;
  enrollment: {
    status: string;
  };
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { courses, isLoading } = useCreatorCourses();
  
  const filteredCourses = courses.filter((course: Course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "published") return matchesSearch && course.enrollment.status === "open";
    if (activeTab === "drafts") return matchesSearch && course.enrollment.status === "closed";
    
    return matchesSearch;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/courses/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Course
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course: Course) => (
              <Card key={course.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Course menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/courses/${course.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/courses/${course.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={course.enrollment.status === "open" ? "default" : "secondary"}>
                      {course.enrollment.status === "open" ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">
                      {course.is_free ? "Free" : `$${course.price}`}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/dashboard/courses/${course.id}/edit`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}