import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError, newCustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({
      where: { userId },
      select: [
        'userId',
        'firstName',
        'lastName',
        'phone',
        'email',
        'role',
        'language',
        'created_at',
        'updated_at',
      ],
    });

    if (user.userId !== userId) {
      const customError = new newCustomError(401, 401, 'Forbiden Request', `Unauthorized Request`);
      return next(customError);
    }
    if (!user) {
      const customError = new CustomError(404, 'General', `User with userId:${userId} not found.`, ['User not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'success', 'User found', {
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
