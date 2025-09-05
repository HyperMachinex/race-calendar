"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Event } from "@/app/page";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  events: Event[];
  onEventClick: (event: Event) => void;
}

const eventTypeColors = {
  formula1: "bg-red-600",
  motogp: "bg-[#b251d6]",
  wec: "bg-black",
  wrc: "bg-orange-500",
  other: "bg-gray-500",
};

const typeToColorKey: Record<Event["type"], keyof typeof eventTypeColors> = {
  "Formula 1": "formula1",
  MotoGP: "motogp",
  WEC: "wec",
  WRC: "wrc",
};

export function Sidebar({
  isOpen,
  onToggle,
  events,
  onEventClick,
}: SidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set(["all"])
  );

  const isAllSelected =
    selectedFilters.has("all") || selectedFilters.size === 0;

  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (key === "all") {
        return new Set(["all"]);
      }
      next.delete("all");
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      if (next.size === 0) {
        return new Set(["all"]);
      }
      return next;
    });
  };

  const isSelected = (key: string) =>
    selectedFilters.has(key) && !isAllSelected;

  const selectedColorClasses: Record<string, string> = {
    formula1: "bg-red-600 text-white",
    motogp: "bg-[#b251d6] text-white",
    wec: "bg-black text-white",
    wrc: "bg-orange-500 text-white",
  };

  const filteredEvents = events.filter((event) => {
    if (isAllSelected) return true;
    const key = typeToColorKey[event.type];
    return selectedFilters.has(key);
  });

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const todayStart = startOfDay(new Date());

  const upcomingEvents = filteredEvents
    .filter((event) => startOfDay(event.date) >= todayStart)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          !isOpen && "lg:hidden"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-5 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-sidebar-primary" />
                <h2 className="text-lg font-semibold text-sidebar-foreground">
                  Navigation
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="px-6 py-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-sidebar-foreground" />
              <span className="text-sm font-medium text-sidebar-foreground">
                Filter Events
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-violet-50 p-2 rounded-md">
              <Button
                variant={isAllSelected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("all")}
                className={cn(
                  isAllSelected &&
                    "bg-sidebar-primary text-sidebar-primary-foreground"
                )}
              >
                All
              </Button>
              <Button
                variant={isSelected("formula1") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("formula1")}
                className={cn(
                  isSelected("formula1") && selectedColorClasses["formula1"]
                )}
              >
                Formula 1
              </Button>
              <Button
                variant={isSelected("motogp") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("motogp")}
                className={cn(
                  isSelected("motogp") && selectedColorClasses["motogp"]
                )}
              >
                MotoGP
              </Button>
              <Button
                variant={isSelected("wec") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("wec")}
                className={cn(isSelected("wec") && selectedColorClasses["wec"])}
              >
                WEC
              </Button>
              <Button
                variant={isSelected("wrc") ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter("wrc")}
                className={cn(isSelected("wrc") && selectedColorClasses["wrc"])}
              >
                WRC
              </Button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-sidebar-foreground" />
              <span className="text-sm font-medium text-sidebar-foreground">
                Upcoming Events
              </span>
            </div>

            <div className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="p-3 cursor-pointer hover:bg-sidebar-accent transition-colors"
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full mt-1",
                          eventTypeColors[typeToColorKey[event.type]]
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-sidebar-foreground truncate">
                          {event.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.date.toLocaleDateString()} at {event.time} ·{" "}
                          {event.sessionType}
                        </p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No upcoming events
                </p>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
