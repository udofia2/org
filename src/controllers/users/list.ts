import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = dataSource.getRepository(User);
  try {
    const users = await userRepository.find({
      select: ['userId', 'firstName', 'lastName', 'phone', 'email', 'role', 'language', 'created_at', 'updated_at'],
    });
    res.customSuccess(200, 'success', 'List of users.', users);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
