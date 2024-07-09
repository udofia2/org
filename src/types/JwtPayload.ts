import { Role } from '../orm/entities/users/types';

export type JwtPayload = {
  userId: string;
  firstName: string;
  email: string;
  role: Role;
  created_at: Date;
};
