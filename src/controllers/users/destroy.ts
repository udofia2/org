import { Request, Response, NextFunction } from 'express';
import { dataSource} from '../../orm/dbCreateConnection'

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User with id:${userId} doesn't exists.`]);
      return next(customError);
    }
    userRepository.delete(userId);

    res.customSuccess(200, 'success', 'User successfully deleted.', { userId: user.userId, name: user.firstName, email: user.email });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
