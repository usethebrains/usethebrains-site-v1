"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Sample data - in a real app this would come from an API
const activities = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "",
      initials: "JS",
    },
    action: "completed",
    course: "Introduction to JavaScript",
    time: "2 hours ago",
    type: "completion",
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "",
      initials: "SJ",
    },
    action: "enrolled in",
    course: "Advanced React Patterns",
    time: "3 hours ago",
    type: "enrollment",
  },
  {
    id: 3,
    user: {
      name: "Michael Brown",
      avatar: "",
      initials: "MB",
    },
    action: "left a review on",
    course: "Python for Data Science",
    time: "5 hours ago",
    type: "review",
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      avatar: "",
      initials: "ED",
    },
    action: "started",
    course: "UI/UX Design Fundamentals",
    time: "1 day ago",
    type: "started",
  },
  {
    id: 5,
    user: {
      name: "David Wilson",
      avatar: "",
      initials: "DW",
    },
    action: "achieved a certificate for",
    course: "Web Development Bootcamp",
    time: "1 day ago",
    type: "certificate",
  },
];

// Get badge variant based on activity type
const getBadgeVariant = (type: string): "default" | "secondary" | "outline" | "destructive" => {
  switch (type) {
    case "completion":
      return "default";
    case "enrollment":
      return "secondary";
    case "review":
      return "outline";
    case "certificate":
      return "default";
    default:
      return "outline";
  }
};

export default function RecentActivityList() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user.name}</span>{" "}
              <span className="text-muted-foreground">{activity.action}</span>{" "}
              <span className="font-medium">{activity.course}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
          <Badge variant={getBadgeVariant(activity.type)}>
            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
          </Badge>
        </div>
      ))}
    </div>
  );
}