import { NextRequest, NextResponse } from 'next/server';
import type { Category, UpdateCategoryInput, ApiResponse } from '@/types';
import { DEFAULT_CATEGORIES } from '@/constants/categories';

// Mock in-memory storage (shared with categories/route.ts)
let categories: Category[] = [...DEFAULT_CATEGORIES];

/**
 * GET /api/categories/[id]
 * Retrieve a specific category by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = categories.find((c) => c.id === params.id);

    if (!category) {
      const response: ApiResponse<null> = {
        error: 'Category not found',
        success: false,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Category> = {
      data: category,
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to fetch category',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * PATCH /api/categories/[id]
 * Update an existing category
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: Partial<UpdateCategoryInput> = await request.json();
    const categoryIndex = categories.findIndex((c) => c.id === params.id);

    if (categoryIndex === -1) {
      const response: ApiResponse<null> = {
        error: 'Category not found',
        success: false,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const updatedCategory: Category = {
      ...categories[categoryIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
    };

    categories[categoryIndex] = updatedCategory;

    const response: ApiResponse<Category> = {
      data: updatedCategory,
      message: 'Category updated successfully',
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to update category',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * DELETE /api/categories/[id]
 * Delete a category
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryIndex = categories.findIndex((c) => c.id === params.id);

    if (categoryIndex === -1) {
      const response: ApiResponse<null> = {
        error: 'Category not found',
        success: false,
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Check if it's a default category
    if (categories[categoryIndex].isDefault) {
      const response: ApiResponse<null> = {
        error: 'Cannot delete default category',
        success: false,
      };
      return NextResponse.json(response, { status: 400 });
    }

    categories.splice(categoryIndex, 1);

    const response: ApiResponse<null> = {
      message: 'Category deleted successfully',
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to delete category',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
