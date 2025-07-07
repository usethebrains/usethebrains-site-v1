"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommunityData, CommunityMember, MemberRole, CommunityInvite, CommunityStats } from "@/lib/data";
import {
  Crown, 
  Mail,
  MoreHorizontal,
  Search,
  Shield,
  Star,
  UserPlus,
  Users,
  UserX
} from "lucide-react";

// Sample data - in a real app, this would come from an API
const communityData: CommunityData = {
  id: "1",
  name: "JavaScript Developers",
  description: "A community for JavaScript developers to share knowledge and ask questions",
  bannerUrl: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg",
  memberCount: 156,
  category: "Programming",
  isPrivate: false,
  createdAt: "2025-01-15T00:00:00Z",
  avatar: "",
  followerCount: 45,
  createdBy: {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg"
  },
  userRole: "admin",
  members: [
    {
      userId: "1",
      userName: "Sarah Johnson",
      userAvatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
      role: "admin",
      joinedAt: "2025-01-15",
      isActive: true
    },
    {
      userId: "2",
      userName: "Mike Wilson",
      userAvatar: "",
      role: "moderator",
      joinedAt: "2025-02-01",
      isActive: true
    },
    {
      userId: "3",
      userName: "Emma Davis",
      userAvatar: "",
      role: "member",
      joinedAt: "2025-02-15",
      isActive: true
    }
  ],
  invites: [
    {
      id: "1",
      email: "john.doe@example.com",
      sentAt: "2025-03-19T14:30:00Z",
      status: "pending"
    }
  ],
  stats: {
    totalMembers: 156,
    activeToday: 45,
    newThisWeek: 12
  },
  followers: [],
  posts: [],
  events: [],
  resources: []
};

const roleColors: Record<MemberRole, string> = {
  admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  moderator: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  member: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
};

const getRoleIcon = (role: MemberRole) => {
  switch (role) {
    case "admin":
      return <Crown className="h-4 w-4" />;
    case "moderator":
      return <Shield className="h-4 w-4" />;
    default:
      return <Users className="h-4 w-4" />;
  }
};

export default function MembersPage() {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  // Filter members based on search and role
  const filteredMembers = communityData.members.filter(member => {
    const matchesSearch = member.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleInvite = () => {
    // Handle invite logic
    console.log("Inviting:", inviteEmail);
    setInviteEmail("");
    setShowInviteDialog(false);
  };

  const handleRoleChange = (memberId: string, newRole: MemberRole) => {
    // Handle role change logic
    console.log("Changing role:", { memberId, newRole });
  };

  const handleRemoveMember = (memberId: string) => {
    // Handle member removal logic
    console.log("Removing member:", memberId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Community Members</h1>
            <p className="text-muted-foreground">
              Manage members and their roles in {communityData.name}
            </p>
          </div>
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Members
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite New Members</DialogTitle>
                <DialogDescription>
                  Send invitations to join your community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter email address"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple emails with commas
                  </p>
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full" onClick={handleInvite}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invites
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Total Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityData.stats.totalMembers}</div>
              <p className="text-sm text-muted-foreground">
                {communityData.stats.newThisWeek} new this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Active Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityData.stats.activeToday}</div>
              <p className="text-sm text-muted-foreground">
                {Math.round((communityData.stats.activeToday / communityData.stats.totalMembers) * 100)}% of members
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Pending Invites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{communityData.invites.length}</div>
              <p className="text-sm text-muted-foreground">
                Last sent {new Date(communityData.invites[0]?.sentAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                    <SelectItem value="moderator">Moderators</SelectItem>
                    <SelectItem value="member">Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="divide-y">
                {filteredMembers.map((member) => (
                  <div key={member.userId} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.userAvatar || undefined} alt={member.userName} />
                        <AvatarFallback>{member.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.userName}</span>
                          <Badge variant="outline" className={roleColors[member.role as MemberRole]}>
                            <span className="flex items-center gap-1">
                              {getRoleIcon(member.role as MemberRole)}
                              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                            </span>
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                          <span>Status: {member.isActive ? "Active" : "Inactive"}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleRoleChange(member.userId, "moderator")}>
                          <Shield className="mr-2 h-4 w-4" />
                          Make Moderator
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(member.userId, "member")}>
                          <Users className="mr-2 h-4 w-4" />
                          Make Member
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleRemoveMember(member.userId)}
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}