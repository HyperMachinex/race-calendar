import { Request, Response } from 'express';
import { CategoryModel } from '@models/category.mongo';
import { ApiResponse } from '@types';
import { logger } from '@config/logger';

export class CategoryController {
  // Get all categories
  async getCategories(_req: Request, res: Response<ApiResponse>) {
    try {
      const categories = await CategoryModel.find().sort({ name: 1 });

      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      logger.error('Error fetching categories:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch categories',
      });
    }
  }

  // Get category by ID
  async getCategoryById(req: Request, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Category not found',
        });
      }

      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      logger.error('Error fetching category:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch category',
      });
    }
  }

  // Create new category
  async createCategory(req: Request, res: Response<ApiResponse>) {
    try {
      const category = await CategoryModel.create(req.body);

      res.status(201).json({
        success: true,
        data: category,
        message: 'Category created successfully',
      });
    } catch (error: any) {
      logger.error('Error creating category:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create category',
      });
    }
  }

  // Update category
  async updateCategory(req: Request, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Category not found',
        });
      }

      res.json({
        success: true,
        data: category,
        message: 'Category updated successfully',
      });
    } catch (error: any) {
      logger.error('Error updating category:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to update category',
      });
    }
  }

  // Delete category
  async deleteCategory(req: Request, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Category not found',
        });
      }

      if (category.isDefault) {
        return res.status(400).json({
          success: false,
          error: 'Cannot delete default category',
        });
      }

      await category.deleteOne();

      res.json({
        success: true,
        message: 'Category deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting category:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete category',
      });
    }
  }
}
