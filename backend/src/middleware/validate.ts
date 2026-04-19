import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate request body
      const validatedData = schema.parse(req.body);

      // Replace req.body with validated data (removes extra fields)
      req.body = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Use error.issues (not error.errors)
        const messages = error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }));

        res.status(400).json({
          success: false,
          message: 'Validation failed',
          data: {
            errors: messages
          }
        });
        return;
      }

      next(error);
    }
  };
};
