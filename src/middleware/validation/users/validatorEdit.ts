import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  let { firstName, lastName, phone } = req.body;
  const errorsValidation: ErrorValidation[] = [];
  const userRepository = dataSource.getRepository(User);

  firstName = !firstName ? '' : firstName;
  lastName = !lastName ? '' : lastName;
  phone = !phone ? '' : phone;


  const user = await userRepository.findOne({ where: { phone } });
  if (user) {
    errorsValidation.push({ phone: `phone '${phone}' already in use` });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Edit user validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
