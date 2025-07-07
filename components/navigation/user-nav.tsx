"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserData, type StudentUser, type CreatorUser } from "@/lib/data";

export default function UserNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes
  
  // Determine user role based on current path
  const role = pathname?.includes('/dashboard/creator') ? 'creator' : 'student';
  const { data: user, isLoading } = useUserData(role) as { data: (StudentUser | CreatorUser) | null; isLoading: boolean };
  
  const handleSignOut = () => {
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (!isLoggedIn) {
    return (
      <Link href="/login">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
    );
  }

  // Show loading state or return null while user data is loading
  if (isLoading || !user) {
    return null;
  }

  const userInitials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`;
  const dashboardLink = role === 'creator' ? "/dashboard/creator" : "/dashboard/student";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar_url} alt={`${user.first_name} ${user.last_name}`} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={dashboardLink} className="w-full cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>{role === 'creator' ? "Creator Dashboard" : "My Learning"}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/settings?role=${role}`} className="w-full cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}