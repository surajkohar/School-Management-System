import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors/AppError';
import { env } from '../config/env';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  // 1. Handle our custom AppErrors
  if (err instanceof AppError) {
    const response: any = {
      success: false,
      message: err.message,
      data: null
    };

    // Add stack trace in development

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
      response.error = err.name;
    }

    res.status(err.statusCode).json(response);
    return;
  }

  // 2. Mongoose Validation Error (schema validation failed)
  if (err.name === 'ValidationError') {
    const mongooseError = err as any;
    const messages = Object.values(mongooseError.errors || {}).map((val: any) => val.message);

    const response: any = {
      success: false,
      message: messages.join(', ') || 'Validation failed',
      data: null
    };

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
      response.errors = mongooseError.errors;
    }

    res.status(400).json(response);
    return;
  }

  // 3. Mongoose Duplicate Key Error (unique constraint violated)
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue || {})[0];

    const response: any = {
      success: false,
      message: field ? `${field} already exists` : 'Duplicate entry',
      data: null
    };

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
      response.duplicateField = field;
    }

    res.status(409).json(response);
    return;
  }

  // 4. Mongoose Cast Error (invalid ObjectId format)
  if (err.name === 'CastError') {
    const castError = err as any;

    const response: any = {
      success: false,
      message: `Invalid ${castError.path}: ${castError.value}`,
      data: null
    };

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
      response.kind = castError.kind;
    }

    res.status(400).json(response);
    return;
  }

  // 5. MongoDB Connection / Network Errors
  if (err.name === 'MongoNetworkError' || err.message?.includes('ECONNREFUSED')) {
    const response: any = {
      success: false,
      message: 'Database connection failed',
      data: null
    };

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }

    res.status(503).json(response);
    return;
  }

  // 6. JWT / Authentication Errors
  if (err.name === 'JsonWebTokenError') {
    const response: any = {
      success: false,
      message: 'Invalid token',
      data: null
    };

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }

    res.status(401).json(response);
    return;
  }

  if (err.name === 'TokenExpiredError') {
    const response: any = {
      success: false,
      message: 'Token expired',
      data: null
    };

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
      response.expiredAt = (err as any).expiredAt;
    }

    res.status(401).json(response);
    return;
  }

  // 7. Syntax / JSON Parse Errors
  if (err instanceof SyntaxError && 'body' in err) {
    const response: any = {
      success: false,
      message: 'Invalid JSON format',
      data: null
    };

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }

    res.status(400).json(response);
    return;
  }

  // 8. Zod Validation Errors (if using Zod)
  if (err.name === 'ZodError' || (err as any).issues) {
    const zodError = err as any;

    const response: any = {
      success: false,
      message: 'Validation failed',
      data: {
        errors:
          zodError.issues?.map((issue: any) => ({
            path: issue.path?.join('.'),
            message: issue.message
          })) || null
      }
    };

    if (env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }

    res.status(400).json(response);
    return;
  }

  // 9. Fallback - Unknown Error
  console.error('Unhandled error:', err);

  const response: any = {
    success: false,
    message: env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    data: null
  };

  if (env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.type = err.name;
  }

  res.status(500).json(response);
}
