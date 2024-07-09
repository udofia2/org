import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const { firstName, lastName, phone } = req.body;

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with userId:${userId} not found.`, ['User not found.']);
      return next(customError);
    }

    user.firstName = firstName
    user.lastName = lastName
    user.phone = phone

    try {
      await userRepository.save(user);
      res.customSuccess(200, 'success', 'User successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `User '${user.email}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
