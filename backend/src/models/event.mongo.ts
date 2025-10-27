import mongoose, { Schema, Document } from 'mongoose';
import { IEvent } from '@types';

export interface EventDocument extends Omit<IEvent, 'id'>, Document {}

const EventSchema = new Schema<EventDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      index: true,
    },
    startTime: {
      type: String,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'],
    },
    endTime: {
      type: String,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'],
    },
    categoryId: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    color: {
      type: String,
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'],
    },
    isAllDay: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for better query performance
EventSchema.index({ date: 1, categoryId: 1 });
EventSchema.index({ title: 'text', description: 'text' });

export const EventModel = mongoose.model<EventDocument>('Event', EventSchema);
