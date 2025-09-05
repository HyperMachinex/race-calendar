"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as UICalendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Event } from "@/app/page";

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, "id"> | Event) => void;
  onDelete?: () => void;
  event?: Event | null;
  selectedDate: Date;
}

export function EventDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  selectedDate,
}: EventDialogProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<Event["type"]>("Formula 1");
  const [sessionType, setSessionType] = useState<Event["sessionType"]>("Race");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const formatDisplayDate = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const parseDisplayDate = (value: string) => {
    const [dd, mm, yyyy] = value.split("-").map(Number);
    if (!dd || !mm || !yyyy) return null;
    return { day: dd, month: mm, year: yyyy };
  };

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(formatDisplayDate(event.date));
      setTime(event.time);
      setDescription(event.description || "");
      setType(event.type);
      setSessionType(event.sessionType);
    } else {
      setTitle("");
      setDate(formatDisplayDate(selectedDate));
      setTime("15:00");
      setDescription("");
      setType("Formula 1");
      setSessionType("Race");
    }
  }, [event, selectedDate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = parseDisplayDate(date);
    if (!parsed) return;
    const { year, month, day } = parsed;
    // Normalize time input to HH:mm; fallback to 00:00 if invalid
    const timeMatch = time.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
    const safeTime = timeMatch ? time : "00:00";
    const eventData = {
      title,
      date: new Date(year, month - 1, day),
      time: safeTime,
      description,
      type,
      sessionType,
    };

    if (event) {
      onSave({ ...eventData, id: event.id });
    } else {
      onSave(eventData);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Add New Event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" value={date} readOnly disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time (24h)</Label>
              <Input
                id="time"
                type="text"
                inputMode="numeric"
                placeholder="15:00"
                maxLength={5}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Classification</Label>
              <Select
                value={type}
                onValueChange={(value: Event["type"]) => setType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select classification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formula 1">Formula 1</SelectItem>
                  <SelectItem value="MotoGP">MotoGP</SelectItem>
                  <SelectItem value="WEC">WEC</SelectItem>
                  <SelectItem value="WRC">WRC</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionType">Session Type</Label>
              <Select
                value={sessionType}
                onValueChange={(value: Event["sessionType"]) =>
                  setSessionType(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Race">Race</SelectItem>
                  <SelectItem value="Practice">Practice</SelectItem>
                  <SelectItem value="Qualify">Qualify</SelectItem>
                  <SelectItem value="Sprint">Sprint</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <DialogFooter className="flex justify-between">
            <div>
              {event && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete Event
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {event ? "Update Event" : "Add Event"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
