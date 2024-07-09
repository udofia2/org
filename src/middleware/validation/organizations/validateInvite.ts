import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorInviteToOrganization = (req: Request, res: Response, next: NextFunction) => {
  let { userId } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  userId = !userId ? '' : userId;

  if (validator.isEmpty(userId)) {
    errorsValidation.push({ userId: 'userId is required' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'User invitation not successful',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }

  return next();
};
