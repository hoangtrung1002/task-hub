import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <>
      <div className="rounded-2xl border p-4 shadow-sm space-y-3 w-full max-w-md">
        {/* Top Row: Avatar + Title/Time + Members */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <Skeleton className={`h-10 w-10 rounded-md bg-muted`} />
            <div className="space-y-1">
              {/* Title */}
              <Skeleton className="h-4 w-28" />
              {/* Date */}
              <Skeleton className="h-3 w-36" />
            </div>
          </div>

          {/* Member icon and count */}
          <Skeleton className="h-4 w-6" />
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-40" />

        {/* Bottom Text Link */}
        <Skeleton className="h-5 w-3/4" />
      </div>
    </>
  );
};

export default SkeletonCard;
