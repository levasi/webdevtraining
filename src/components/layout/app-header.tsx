"use client";

import Link from "next/link";
import { BookOpen, LayoutDashboard, Library, Menu } from "lucide-react";

import { AddQuestionDialog } from "@/components/layout/add-question-dialog";
import { ButtonLink } from "@/components/ui/button-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "@/lib/auth-client";
import { navigateTo } from "@/lib/navigation";
import { getGoogleAvatarUrl } from "@/lib/user-avatar";
import { CategoriesNavFlyout } from "@/components/layout/categories-nav-flyout";

const navItems = [
  { href: "/categories", label: "Categories", icon: BookOpen },
  { href: "/bookmarks", label: "Bookmarks", icon: BookOpen },
  { href: "/completed", label: "Completed", icon: LayoutDashboard },
  { href: "/resources", label: "Resources", icon: Library },
];

function HeaderAuthActions() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

  if (isPending) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  if (!user) {
    return (
      <>
        <ButtonLink href="/login" variant="outline" size="sm">
          Sign in
        </ButtonLink>
        <ButtonLink href="/register" size="sm">
          Get started
        </ButtonLink>
      </>
    );
  }

  const displayName = user.name || user.email?.split("@")[0] || "Account";
  const avatarUrl = getGoogleAvatarUrl(user.image);
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleSignOut() {
    await signOut();
    navigateTo("/");
  }

  return (
    <>
      {isAdmin ? <AddQuestionDialog /> : null}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full p-0"
              aria-label={`${displayName} account menu`}
            />
          }
        >
          <Avatar size="sm">
            {avatarUrl ? (
              <AvatarImage
                src={avatarUrl}
                alt={displayName}
                referrerPolicy="no-referrer"
              />
            ) : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href="/admin" />}>Admin</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

type AppHeaderProps = {
  onMenuClick?: () => void;
};

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <Menu className="size-4" />
          </Button>
          <Link
            href="/"
            className="font-semibold tracking-tight"
            title="Web Dev Training"
          >
            WDT
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <CategoriesNavFlyout />
          {navItems
            .filter((item) => item.href !== "/categories")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <HeaderAuthActions />
        </div>
      </div>
    </header>
  );
}
