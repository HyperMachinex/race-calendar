import { Router } from 'express';
import { CategoryController } from '@controllers/category.controller';
import { validateCategory } from '@validators/category.validator';
import { validate } from '@middleware/validate';

const router = Router();
const categoryController = new CategoryController();

/**
 * @route   GET /api/v1/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get('/', categoryController.getCategories);

/**
 * @route   GET /api/v1/categories/:id
 * @desc    Get category by ID
 * @access  Public
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @route   POST /api/v1/categories
 * @desc    Create new category
 * @access  Public
 */
router.post('/', validate(validateCategory), categoryController.createCategory);

/**
 * @route   PATCH /api/v1/categories/:id
 * @desc    Update category
 * @access  Public
 */
router.patch('/:id', validate(validateCategory), categoryController.updateCategory);

/**
 * @route   DELETE /api/v1/categories/:id
 * @desc    Delete category
 * @access  Public
 */
router.delete('/:id', categoryController.deleteCategory);

export default router;
