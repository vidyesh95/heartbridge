"use client";

import { useEffect } from "react";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const TOGGLE_BROWSE_FILTERS_EVENT = "heartbridge:toggle-filters";
export const BROWSE_FILTERS_SIDEBAR_ID = "browse-filters";

export function dispatchToggleBrowseFilters() {
  window.dispatchEvent(new Event(TOGGLE_BROWSE_FILTERS_EVENT));
}

export function BrowseFiltersButton({
  onClick,
  className,
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("h-10 cursor-pointer", className)}
      aria-controls={BROWSE_FILTERS_SIDEBAR_ID}
      onClick={onClick}
    >
      <ListFilter />
      Filters
    </Button>
  );
}

export function BrowseFiltersSidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar();
  return <BrowseFiltersButton className={className} onClick={toggleSidebar} />;
}

export function BrowseFiltersToggleListener() {
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    function onToggle() {
      toggleSidebar();
    }
    window.addEventListener(TOGGLE_BROWSE_FILTERS_EVENT, onToggle);
    return () => window.removeEventListener(TOGGLE_BROWSE_FILTERS_EVENT, onToggle);
  }, [toggleSidebar]);

  return null;
}
