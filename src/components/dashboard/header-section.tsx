"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, Heart, Inbox, LogOut, Settings, Shield, UserRound } from "lucide-react";
import {
  BrowseFiltersButton,
  dispatchToggleBrowseFilters,
} from "@/components/profile/browse-filters-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { isAdminRole } from "@/lib/auth-utils";

export default function HeaderSection({
  likesCount = 0,
  bookmarksCount = 0,
  unreadCount = 0,
  hasMatrimonialProfile = false,
}: {
  likesCount?: number;
  bookmarksCount?: number;
  unreadCount?: number;
  hasMatrimonialProfile?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const showAdmin = isAdminRole(user?.role);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  }

  return (
    <header className="fixed top-0 left-0 z-50 flex h-14 w-full flex-col items-center justify-center border border-white/20 bg-white/20 backdrop-blur-xl dark:border-white/20 dark:bg-black/20">
      <nav className="flex w-full flex-row items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link href="/profiles" className="text-2xl font-semibold">
            ♡ HeartBridge
          </Link>
          {pathname === "/profiles" ? (
            <BrowseFiltersButton onClick={dispatchToggleBrowseFilters} />
          ) : null}
        </div>
        <div className="flex flex-row items-center gap-2 md:gap-4">
          <CountLink href="/inbox" label="Inbox" count={unreadCount}>
            <Inbox size={24} />
          </CountLink>
          <CountLink href="/profiles/bookmarked" label="Bookmarked profiles" count={bookmarksCount}>
            <Bookmark size={24} />
          </CountLink>
          <CountLink href="/profiles/liked" label="Liked profiles" count={likesCount}>
            <Heart size={24} />
          </CountLink>
          {user && !hasMatrimonialProfile && !isPending ? (
            <Button className="h-10 cursor-pointer rounded-full" asChild>
              <Link href="/onboarding">Create profile</Link>
            </Button>
          ) : null}
          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image ?? undefined} alt={user.name} />
                    <AvatarFallback>{(user.name ?? "U").slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/me">
                    <UserRound />
                    My profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings />
                    Settings
                  </Link>
                </DropdownMenuItem>
                {showAdmin ? (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <Shield />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem onSelect={handleSignOut}>
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="h-10 cursor-pointer rounded-full" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

function CountLink({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      className="relative h-10 w-10 cursor-pointer rounded-full text-primary"
      asChild
    >
      <Link href={href} aria-label={label}>
        {children}
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none text-white">
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
}
