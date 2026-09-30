import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { IconButton } from '../ui/icon-button';

interface CalendarToolbarProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function CalendarToolbar({ title, onPrev, onNext, onToday }: CalendarToolbarProps) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 md:mb-4">
      <div className="flex min-w-0 items-center gap-1">
        <IconButton onClick={onPrev} aria-label="Previous" title="Previous">
          <ChevronLeft />
        </IconButton>
        <IconButton onClick={onNext} aria-label="Next" title="Next">
          <ChevronRight />
        </IconButton>
        <h2 className="ml-1 truncate text-lg font-bold tracking-tight md:text-xl">{title}</h2>
      </div>
      <Button variant="outline" size="sm" onClick={onToday}>
        Today
      </Button>
    </div>
  );
}
