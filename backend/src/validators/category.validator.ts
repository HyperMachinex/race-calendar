import { body } from 'express-validator';

export const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),

  body('color')
    .notEmpty()
    .withMessage('Color is required')
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Invalid color format'),

  body('icon')
    .optional()
    .trim()
    .isString()
    .withMessage('Icon must be a string'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),
];
