"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Bell, BookOpen, Calendar, Edit, Facebook, Github, Heart, Linkedin as LinkedIn, Lock, MessageSquare, MoreHorizontal, PenSquare, Pin, Settings, Share2, Twitter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCommunity, type CommunityData, type MemberRole } from "@/lib/data";

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  attendees: number;
}

interface CommunityResource {
  id: string;
  title: string;
  downloads: number;
}

export default function CommunityPage() {
  const { id } = useParams();
  const { community: communityData, isLoading } = useCommunity(id as string) as { community: CommunityData | null; isLoading: boolean; };
  
  const [newPost, setNewPost] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [settings, setSettings] = useState({
    allowGuestPosts: false,
    requirePostApproval: true,
    allowMemberInvites: true,
    notifications: {
      newPosts: true,
      events: true,
      mentions: true
    }
  });

  const handlePost = () => {
    console.log("New post:", newPost);
    setNewPost("");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const shareUrls: Record<'twitter' | 'facebook' | 'linkedin', string> = {
      twitter: `https://twitter.com/intent/tweet?text=Check out ${communityData?.name}&url=${window.location.href}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShowShareDialog(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading community...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!communityData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center"> 
            <h2 className="text-2xl font-bold mb-2">Community Not Found</h2>
            <p className="text-muted-foreground mb-4">The community you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/dashboard/community">Back to Communities</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = communityData.userRole === 'admin' as MemberRole;
  const isModerator = communityData.userRole === 'moderator' as MemberRole;
  const canManageCommunity = isAdmin || isModerator;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Banner and Community Info */}
        <div className="relative h-48 rounded-lg overflow-hidden">
          <Image
            src={communityData.bannerUrl || "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg"}
            alt={communityData.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">{communityData.name}</h1>
                  {communityData.isPrivate && (
                    <Lock className="h-4 w-4 text-white/80" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{communityData.category}</Badge>
                  <span className="text-sm text-white/80">
                    {communityData.memberCount} members
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={isFollowing ? "secondary" : "default"}
                  onClick={handleFollow}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>

                <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Share Community</DialogTitle>
                      <DialogDescription>
                        Share this community with your network
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleShare('twitter')}
                      >
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleShare('facebook')}
                      >
                        <Facebook className="mr-2 h-4 w-4" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleShare('linkedin')}
                      >
                        <LinkedIn className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setShowShareDialog(false);
                        }}
                      >
                        Copy Link
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {canManageCommunity && (
                  <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Community Settings</DialogTitle>
                        <DialogDescription>
                          Manage your community preferences and permissions
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Allow Guest Posts</Label>
                            <p className="text-sm text-muted-foreground">
                              Let non-members create posts
                            </p>
                          </div>
                          <Switch
                            checked={settings.allowGuestPosts}
                            onCheckedChange={(checked) =>
                              setSettings({ ...settings, allowGuestPosts: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Require Post Approval</Label>
                            <p className="text-sm text-muted-foreground">
                              Moderators must approve posts
                            </p>
                          </div>
                          <Switch
                            checked={settings.requirePostApproval}
                            onCheckedChange={(checked) =>
                              setSettings({ ...settings, requirePostApproval: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Allow Member Invites</Label>
                            <p className="text-sm text-muted-foreground">
                              Members can invite others
                            </p>
                          </div>
                          <Switch
                            checked={settings.allowMemberInvites}
                            onCheckedChange={(checked) =>
                              setSettings({ ...settings, allowMemberInvites: checked })
                            }
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        {communityData.socialLinks && (
          <div className="flex items-center gap-4">
            {Object.entries(communityData.socialLinks).map(([platform, url]: [string, string]) => (
              <Link
                key={platform}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {platform === 'twitter' && <Twitter className="h-5 w-5" />}
                {platform === 'facebook' && <Facebook className="h-5 w-5" />}
                {platform === 'linkedin' && <LinkedIn className="h-5 w-5" />}
                {platform === 'github' && <Github className="h-5 w-5" />}
              </Link>
            ))}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Input
                      placeholder="Share something with the community..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <PenSquare className="mr-2 h-4 w-4" />
                          Post
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Event
                        </Button>
                      </div>
                      <Button disabled={!newPost} onClick={handlePost}>
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {communityData.posts?.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{post.userName}</span>
                            <Badge variant="outline">{communityData.members?.find(m => m.userId === post.userId)?.role || "member" as MemberRole}</Badge>
                            {post.isPinned && (
                              <Badge variant="secondary">
                                <Pin className="mr-1 h-3 w-3" />
                                Pinned
                              </Badge>
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pin className="mr-2 h-4 w-4" />
                                Pin Post
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="mt-2">{post.content}</p>
                        {post.attachments && (
                          <div className="mt-4">
                            {post.attachments.map((attachment, index) => (
                              <Link
                                key={`${attachment.url}-${index}`}
                                href={attachment.url}
                                className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted"
                              >
                                <BookOpen className="h-4 w-4" />
                                <span>{attachment.title || attachment.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-foreground">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </button>
                          {post.comments !== undefined && (
                            <button className="flex items-center gap-1 hover:text-foreground">
                              <MessageSquare className="h-4 w-4" />
                              {post.comments}
                            </button>
                          )}
                          <span>
                            {new Date(post.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Community Stats */}
            {communityData.stats && (
              <Card>
                <CardHeader>
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Members</span>
                    <span className="font-medium">{communityData.memberCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Posts</span>
                    <span className="font-medium">{communityData.posts?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Events</span>
                    <span className="font-medium">{communityData.events?.length || 0}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Events */}
            {communityData.events && communityData.events.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communityData.events?.map((event) => (
                    <div key={event.id} className="space-y-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {event.attendees} attending
                      </div>
                      <Button variant="outline" className="w-full">
                        Join Event
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {communityData.resources?.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      <span className="text-sm">{resource.title}</span>
                    </div>
                    <Badge variant="outline">{resource.downloads}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}