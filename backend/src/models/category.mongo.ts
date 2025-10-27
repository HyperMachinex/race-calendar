import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '@types';

export interface CategoryDocument extends Omit<ICategory, 'id'>, Document {}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      unique: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    color: {
      type: String,
      required: [true, 'Color is required'],
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'],
    },
    icon: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
    isDefault: {
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

export const CategoryModel = mongoose.model<CategoryDocument>('Category', CategorySchema);
