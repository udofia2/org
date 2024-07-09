import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateOrganization = (req: Request, res: Response, next: NextFunction) => {
  let { name, description } = req.body;
  const errorsValidation: ErrorValidation[] = [];

    name = !name ? '' : name;

  if (validator.isEmpty(name)) {
    errorsValidation.push({ name: 'Organization name is required' });
  }
  
  if (!validator.isLength(description, { max: 255 })) {
    errorsValidation.push({ description: 'Organization description cannot exceed 255 characters' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Organization creation validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }

  return next();
};
