import React from 'react';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface CalendarSkeletonProps {
  isMobile: boolean;
}

const DAYS_PER_WEEK = 7;
const MONTH_WEEK_ROWS = 5;
const LIST_ROWS = 8;

const MonthGridSkeleton = () => (
  <div className="grid grid-cols-7 gap-1.5">
    {Array.from({ length: DAYS_PER_WEEK }).map((_, index) => (
      <Skeleton key={`day-${index}`} className="h-6" />
    ))}
    {Array.from({ length: DAYS_PER_WEEK * MONTH_WEEK_ROWS }).map((_, index) => (
      <Skeleton key={index} className="h-24" />
    ))}
  </div>
);

const ListSkeleton = () => (
  <div className="flex flex-col gap-2">
    {Array.from({ length: LIST_ROWS }).map((_, index) => (
      <Skeleton key={index} className="h-10" />
    ))}
  </div>
);

function CalendarSkeletonComponent({ isMobile }: CalendarSkeletonProps) {
  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="w-full max-w-md space-y-3">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-5 w-full" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>
      <Card className="p-3 md:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 md:mb-4">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-8 w-16" />
        </div>
        {isMobile ? <ListSkeleton /> : <MonthGridSkeleton />}
      </Card>
    </div>
  );
}

export const CalendarSkeleton = React.memo(CalendarSkeletonComponent);
CalendarSkeleton.displayName = 'CalendarSkeleton';
