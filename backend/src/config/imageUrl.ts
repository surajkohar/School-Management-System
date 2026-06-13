import { Request } from 'express';

export const getFullImageUrl = (req: Request, imagePath: string | undefined): string | null => {
  if (!imagePath) return null;
  
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${imagePath}`;
};