import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { checkUser } from '@/lib/checkUser'

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 py-4 backdrop-blur-lg z-50 supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/">

            <Image 
            src="/sensai_logo.png"
            alt="Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain" />
            </Link>

            <div className="flex items-center space-x-2 md:space-x-4">
                <SignedIn>

                    <Link href="/dashboard">
                       <Button variant="outline">
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="hidden md:block">Industry Insights</span>
                       </Button>
                    </Link>

                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                        <StarsIcon className="mr-2 h-4 w-4" />
                        <span className="hidden md:block">Growth Tools</span>
                        <ChevronDown className="ml-2 h-4 w-4" />
                       </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href="/resume" className="flex items-center space-x-2">
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Build Resume</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/cover-letter" className="flex items-center space-x-2">
                                <PenBox className="mr-2 h-4 w-4" />
                                <span>Cover Letter</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/interview" className="flex items-center space-x-2">
                                <GraduationCap className="mr-2 h-4 w-4" />
                                <span>Interview Prep</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </SignedIn>

            
            <SignedOut>
                <SignInButton> 
                    <Button variant="outline">Sign In</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton appearance={{elements:
                    {avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "text-sm font-semibold",
                    }}}
                    afterSignOutUrl='/'/>
            </SignedIn>
            </div>
        </nav>
    </header>
  )
}

export default Header
