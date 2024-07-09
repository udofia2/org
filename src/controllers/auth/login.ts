import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { Role } from 'orm/entities/users/types';
import { User } from 'orm/entities/users/User';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtToken } from 'utils/createJwtToken';
import { newCustomError } from 'utils/response/custom-error/CustomError';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = dataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      const customError = new newCustomError(401, 401, 'Bad request', 'Authentication failed');
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new newCustomError(401, 401, 'Bad request', 'Authentication failed');
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      userId: user.userId,
      firstName: user.firstName,
      email: user.email,
      role: user.role as Role,
      created_at: user.created_at,
    };

    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, 'success', 'Login successful', {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (err) {
      const customError = new newCustomError(400, 400, 'Bad request', err);
      return next(customError);
    }
  } catch (err) {
    const customError = new newCustomError(400, 400, 'Error', err);
    return next(customError);
  }
};
