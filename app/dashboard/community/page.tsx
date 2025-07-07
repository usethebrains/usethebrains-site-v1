"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, MoreHorizontal, Plus, Search, Settings, Trash, Users } from "lucide-react";
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

// Sample data for groups
const sampleGroups = [
  {
    id: 1,
    name: "JavaScript Developers",
    description: "A community for JavaScript developers to share knowledge and ask questions",
    bannerUrl: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg",
    imageUrl: null,
    memberCount: 156,
    domain: "js-devs.learnsphere.io",
    customDomain: null,
    lastActivity: "2025-03-20",
    category: "Programming",
    isPrivate: false,
    activeMemberCount: 45,
    postCount: 234,
    featuredMembers: [
      { id: 1, name: "John D.", avatar: null, role: "admin" },
      { id: 2, name: "Sarah K.", avatar: null, role: "moderator" },
    ]
  },
  {
    id: 2,
    name: "UX Design Principles",
    description: "Discuss user experience design patterns, tools, and methodologies",
    bannerUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    imageUrl: null,
    memberCount: 89,
    domain: "ux-design.learnsphere.io",
    customDomain: "community.uxdesign.com",
    lastActivity: "2025-03-19",
    category: "Design",
    isPrivate: true,
    activeMemberCount: 32,
    postCount: 156,
    featuredMembers: [
      { id: 3, name: "Mike R.", avatar: null, role: "admin" },
      { id: 4, name: "Emma S.", avatar: null, role: "moderator" },
    ]
  },
  {
    id: 3,
    name: "Data Science Enthusiasts",
    description: "Share data analysis techniques, projects, and learning resources",
    bannerUrl: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
    imageUrl: null,
    memberCount: 122,
    domain: "data-science.learnsphere.io",
    customDomain: null,
    lastActivity: "2025-03-18",
    category: "Data Science",
    isPrivate: false,
    activeMemberCount: 67,
    postCount: 345,
    featuredMembers: [
      { id: 5, name: "Lisa M.", avatar: null, role: "admin" },
      { id: 6, name: "David P.", avatar: null, role: "moderator" },
    ]
  },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter groups based on search and tab
  const filteredGroups = sampleGroups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          group.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Community</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Group
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="moderated">Moderated</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="group overflow-hidden transition-all duration-200 hover:shadow-lg">
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={group.bannerUrl}
                    alt={group.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {group.isPrivate && (
                    <Badge 
                      variant="secondary" 
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                    >
                      Private
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1 flex items-center gap-2">
                        {group.name}
                        <Badge variant="outline" className="text-xs">
                          {group.category}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {group.description}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Group menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Home className="mr-2 h-4 w-4" />
                          Visit Group
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Group
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {group.memberCount} members
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {group.activeMemberCount} active now
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {group.featuredMembers.map((member) => (
                          <div
                            key={member.id}
                            className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center"
                            title={`${member.name || "Member"} (${member.role || ""})`}
                          >
                            {member.avatar ? (
                              <Image
                                src={member.avatar}
                                alt={member.name || "Member"}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                            ) : (
                              <span className="text-xs font-medium">
                                {(member.name || "?").charAt(0)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        +{group.memberCount - group.featuredMembers.length} more
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="secondary" className="text-xs">
                        {group.postCount} posts
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Last active {new Date(group.lastActivity).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 pt-1">
                  <Link href={`/dashboard/community/${group.id}/members`}>
                    <Button variant="outline" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Members
                    </Button>
                  </Link>
                  <Link href={`/dashboard/community/${group.id}`}>
                    <Button size="sm">
                      Manage
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