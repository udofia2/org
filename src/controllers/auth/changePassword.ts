import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';


import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password, passwordNew } = req.body;
  const { userId, firstName } = req.jwtPayload;

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User ${firstName} not found.`]);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(400, 'General', 'Not Found', ['Incorrect password']);
      return next(customError);
    }

    user.password = passwordNew;
    user.hashPassword();
    userRepository.save(user);

    res.customSuccess(200, 'success', 'Password successfully changed.');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
