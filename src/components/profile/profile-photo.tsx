import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProfilePhoto({
  photoPath,
  name,
  visible,
  className,
}: {
  photoPath: string;
  name: string;
  visible: boolean;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (!visible) {
    return (
      <div
        className={cn(
          "flex aspect-square w-full items-center justify-center bg-muted text-2xl font-semibold text-muted-foreground",
          className,
        )}
      >
        {initials}
      </div>
    );
  }

  const isRemote = photoPath.startsWith("http://") || photoPath.startsWith("https://");

  return (
    <Image
      src={photoPath || "/profile_male_1.avif"}
      alt={`Photo of ${name}`}
      width={480}
      height={480}
      unoptimized={isRemote}
      className={cn("aspect-square w-full object-cover", className)}
    />
  );
}
