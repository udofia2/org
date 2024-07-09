import { Language } from 'orm/entities/users/types';

import { JwtPayload } from '../JwtPayload';

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
      language: Language;
    }
    export interface Response {
      customSuccess(httpStatusCode: number, status: string, message: string, data?: any): Response;
    }
  }
}
