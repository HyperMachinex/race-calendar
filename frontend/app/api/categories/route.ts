import { NextRequest, NextResponse } from 'next/server';
import type { Category, CreateCategoryInput, ApiResponse } from '@/types';
import { DEFAULT_CATEGORIES } from '@/constants/categories';

// This is a mock implementation. Replace with actual database operations.
let categories: Category[] = [...DEFAULT_CATEGORIES];

/**
 * GET /api/categories
 * Retrieve all categories
 */
export async function GET(request: NextRequest) {
  try {
    const response: ApiResponse<Category[]> = {
      data: categories,
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to fetch categories',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * POST /api/categories
 * Create a new category
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateCategoryInput = await request.json();

    // Validate required fields
    if (!body.name || !body.color) {
      const response: ApiResponse<null> = {
        error: 'Missing required fields: name, color',
        success: false,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const newCategory: Category = {
      id: `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      isDefault: false,
    };

    categories.push(newCategory);

    const response: ApiResponse<Category> = {
      data: newCategory,
      message: 'Category created successfully',
      success: true,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to create category',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
