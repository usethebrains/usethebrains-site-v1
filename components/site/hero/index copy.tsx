'use client'
import React from 'react'
import Image from 'next/image'
import {User} from '@clerk/nextjs/server'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/global/mode-toggle'
import { cn } from "@/lib/utils"
import { useMediaQuery } from '@/hooks/use-media-query'
import Stripe from "@/components/svgs/stripe";
import { FaGoogle } from "react-icons/fa6";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Key, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const components: { title: string; href: string; description: string }[] = [
  {
    title: "TERC App",
    href: "https://play.google.com/store/apps/details?id=com.usethebrains.tinyexamreportcard&pcampaignid=web_share",
    description:
      "Create an end of term examination report card for school.",
  },
  {
    title: "QuickGes Quiz",
    href: "#",
    description:
      "Well-organized quizzes based on the new GES curriculum",
  },
  {
    title: "Youtube Channel",
    href: "https://www.youtube.com/@usethebrains",
    description:
      "Dive into the Digital World from ou new youtube channel",
  },
  {
    title: "BECE Inside",
    href: "https://play.google.com/store/apps/details?id=com.usethebrains.bece_inside&pcampaignid=web_share",
    description: "We are thrilled to announce the integration of AI functionality into BECE Inside",
  },
  {
    title: "Phonics App",
    href: "#",
    description:
      "Mastering the ability to decode words and read on your own with the help of this App",
  },
  {
    title: "Vedic Maths",
    href: "#",
    description:
      "A mental math system that simplifies solving mathematical problems",
  },
]
const componentsm: { title: string; href: string; description: string }[] = [
  {
    title: "Home",
    href: "/",
    description:
      "home",
  },
  {
    title: "Blog",
    href: "#",
    description:
      "blog",
  },
  {
    title: "TERC App",
    href: "https://play.google.com/store/apps/details?id=com.usethebrains.tinyexamreportcard&pcampaignid=web_share",
    description:
      "Create an end of term examination report card for school.",
  },
  {
    title: "QuickGes Quiz",
    href: "#",
    description:
      "Well-organized quizzes based on the new GES curriculum",
  },
  {
    title: "Youtube Channel",
    href: "https://www.youtube.com/@usethebrains",
    description:
      "Dive into the Digital World from ou new youtube channel",
  },
  {
    title: "BECE Inside",
    href: "https://play.google.com/store/apps/details?id=com.usethebrains.bece_inside&pcampaignid=web_share",
    description: "We are thrilled to announce the integration of AI functionality into BECE Inside",
  },
  {
    title: "Phonics App",
    href: "#",
    description:
      "Mastering the ability to decode words and read on your own with the help of this App",
  },
  {
    title: "Vedic Maths",
    href: "#",
    description:
      "A mental math system that simplifies solving mathematical problems",
  },
  {
    title: "Contact",
    href: "#",
    description:
      "contact",
  },
]
 

type Props = {
    user?: null | User
}

const Navigation = ({user}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 700px)");
  return isDesktop ? 
  <div className="fixed top-0 right-0 left-0 p-2 flex items-center justify-between z-10 border-b border-n-2 backdrop-blur-sm bg-[url(/assets/gradient.png)] ">
    <Link href={'/'} className='m-0 p-0'>
    <aside className="flex items-center gap-2 ">
         <Image
           src={'/assets/usethebrainslogocircle.png'}
           width={30}
           height={30}
           alt="plur logo"
         />
          <span className="text-base font-bold"> usethebrains</span>
         </aside>
    </Link>







    <NavigationMenu>
      <NavigationMenuList>

      <NavigationMenuItem>
          <Link href={'/'} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      {/**
       *   <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="bg-black grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       */}

        <NavigationMenuItem>
          <NavigationMenuTrigger>Coming soon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="bg-black grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.description}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="#" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="#" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>


    <aside className="flex gap-2 items-center">
        <Link
          href={'/organization/sign-up'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
    




    :
    <div className="fixed top-0 right-0 left-0 p-[10px] flex items-center justify-between z-10 border-b border-n-2 backdrop-blur-sm bg-[url(/assets/gradient.png)] ">
      <Link href={'/'} className='m-0 p-0'>
    <aside className="flex items-center gap-2 ">
         <Image
           src={'/assets/usethebrainslogocircle.png'}
           width={28}
           height={28}
           alt="plur logo"
         />
          <span className="text-base font-bold"> usethebrains</span>
         </aside>
    </Link>
     
     
     
     
     
     
     
     
 







<aside className="flex py-1 gap-2 items-center mr-1">
<UserButton />
<ModeToggle />
        <Link
          href={'/organization/sign-up'}
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        
        <Sheet >
  <SheetTrigger>
    <MenuIcon width={30} height={30}/>
  </SheetTrigger>
  <SheetContent className='bg-black w-full'>
    <SheetHeader>
    <SheetTitle className="text-start">Overview</SheetTitle>
      <SheetDescription className="overflow-y-auto h-full">
<div className="justify-between items-center w-full text-white">
                <ul className="flex flex-col mt-4 font-semibold  w-full">
                {componentsm.map((item, index) =>(
                  item.title,
                    <li key={index}>
                      <a href={item.href} className="block text-lg text-start py-[10] hover:bg-gray-500 my-3 pr-4 pl-3 text-white border-b border-gray-400">{item.title}</a>
                    </li>
                ))}
                </ul>
            </div>




           
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
      </aside>
    </div>
  
}
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block bg-transparent select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export default Navigation