"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Event } from "@/app/page";
import { cn } from "@/lib/utils";

interface DayEventsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  events: Event[];
  onAddEvent: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

export function DayEventsDialog({
  isOpen,
  onClose,
  date,
  events,
  onAddEvent,
  onEventClick,
}: DayEventsDialogProps) {
  const sorted = [...events].sort((a, b) => a.time.localeCompare(b.time));

  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  const eventTypeColors = {
    formula1: "bg-red-600",
    motogp: "bg-[#b251d6]",
    wec: "bg-black",
    wrc: "bg-orange-500",
    other: "bg-gray-500",
  } as const;

  const typeToColorKey: Record<Event["type"], keyof typeof eventTypeColors> = {
    "Formula 1": "formula1",
    MotoGP: "motogp",
    WEC: "wec",
    WRC: "wrc",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <div className="flex items-center justify-between pr-10">
            <DialogTitle>Events on {formattedDate}</DialogTitle>
            <Button
              size="sm"
              onClick={() => onAddEvent(date)}
              className="bg-primary hover:bg-primary/90"
            >
              Add Event
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          {sorted.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No events for this date.
            </p>
          ) : (
            sorted.map((ev) => (
              <Card
                key={ev.id}
                className="p-3 cursor-pointer hover:bg-accent/60 transition-colors"
                onClick={() => onEventClick(ev)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full mt-1",
                      eventTypeColors[typeToColorKey[ev.type]]
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">
                      {ev.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 truncate">
                      {ev.time} · {ev.type} · {ev.sessionType}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
