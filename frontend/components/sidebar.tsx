"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Calendar,
  Clock,
  Filter,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
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
  motogp: "bg-orange-600",
  wec: "bg-blue-600",
  rally: "bg-green-600",
  nascar: "bg-yellow-500",
  indycar: "bg-blue-900",
  formulae: "bg-cyan-500",
  other: "bg-gray-500",
};

const typeToColorKey: Record<Event["type"], keyof typeof eventTypeColors> = {
  "Formula 1": "formula1",
  MotoGP: "motogp",
  WEC: "wec",
  Rally: "rally",
  NASCAR: "nascar",
  IndyCar: "indycar",
  "Formula E": "formulae",
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
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const isAllSelected = selectedFilters.has("all");

  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev);

      if (key === "all") {
        // If "all" is currently selected, deselect it and select all individual categories
        if (prev.has("all")) {
          return new Set(["formula1", "motogp", "wec", "rally", "nascar", "indycar", "formulae"]);
        } else {
          // If "all" is not selected, select it and clear individual selections
          return new Set(["all"]);
        }
      }

      // Handle individual category toggles
      // If "all" was selected and we're toggling an individual category
      if (prev.has("all")) {
        // Remove "all" and select all categories EXCEPT the clicked one
        const allCategories = ["formula1", "motogp", "wec", "rally", "nascar", "indycar", "formulae"];
        return new Set(allCategories.filter((cat) => cat !== key));
      } else {
        // Normal individual category toggle when "all" is not selected
        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }

        // If no individual categories are selected, select "all"
        if (next.size === 0) {
          return new Set(["all"]);
        }

        // If all individual categories are selected, switch to "all"
        const allCategories = ["formula1", "motogp", "wec", "rally", "nascar", "indycar", "formulae"];
        const hasAllCategories = allCategories.every((cat) => next.has(cat));
        if (hasAllCategories) {
          return new Set(["all"]);
        }
      }

      return next;
    });
  };

  const isSelected = (key: string) => selectedFilters.has(key) || isAllSelected;

  const selectedColorClasses: Record<string, string> = {
    formula1: "bg-red-600 text-white",
    motogp: "bg-orange-600 text-white",
    wec: "bg-blue-600 text-white",
    rally: "bg-green-600 text-white",
    nascar: "bg-yellow-500 text-white",
    indycar: "bg-blue-900 text-white",
    formulae: "bg-cyan-500 text-white",
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
          <div className="px-6 py-4.5 border-b border-sidebar-border">
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
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto hover:bg-transparent"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-sidebar-foreground" />
                    <span className="text-sm font-medium text-sidebar-foreground">
                      Filter Events
                    </span>
                  </div>
                  {isFilterOpen ? (
                    <ChevronDown className="h-4 w-4 text-sidebar-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="all"
                      checked={isAllSelected}
                      onCheckedChange={() => toggleFilter("all")}
                    />
                    <label
                      htmlFor="all"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      All Events
                    </label>
                  </div>

                  <div className="space-y-2 pl-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="formula1"
                        checked={isSelected("formula1")}
                        onCheckedChange={() => toggleFilter("formula1")}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                        <label
                          htmlFor="formula1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Formula 1
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="motogp"
                        checked={isSelected("motogp")}
                        onCheckedChange={() => toggleFilter("motogp")}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#b251d6]"></div>
                        <label
                          htmlFor="motogp"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          MotoGP
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wec"
                        checked={isSelected("wec")}
                        onCheckedChange={() => toggleFilter("wec")}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                        <label
                          htmlFor="wec"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          WEC
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rally"
                        checked={isSelected("rally")}
                        onCheckedChange={() => toggleFilter("rally")}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-600"></div>
                        <label
                          htmlFor="rally"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Rally
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nascar"
                        checked={isSelected("nascar")}
                        onCheckedChange={() => toggleFilter("nascar")}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <label
                          htmlFor="nascar"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          NASCAR
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="indycar"
                        checked={isSelected("indycar")}
                        onCheckedChange={() => toggleFilter("indycar")}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-900"></div>
                        <label
                          htmlFor="indycar"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          IndyCar
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="formulae"
                        checked={isSelected("formulae")}
                        onCheckedChange={() => toggleFilter("formulae")}
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                        <label
                          htmlFor="formulae"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Formula E
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
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
