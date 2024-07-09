import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { createJwtToken } from 'utils/createJwtToken';
import { JwtPayload } from 'types/JwtPayload';
import { Role } from 'orm/entities/users/types';
import { Organization } from 'orm/entities/organization/Organization';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName, phone } = req.body;
  const userRepository = dataSource.getRepository(User);
  const organizationRepository = dataSource.getRepository(Organization);

  try {
    const user = await userRepository.findOne({ where: { email: email } });

    if (user) {
      const customError = new CustomError(400, 'General', 'User already exists', [
        `Email '${user.email}' already exists`,
      ]);
      return next(customError);
    }

    try {
      // Create a new user
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.phone = phone;
      newUser.hashPassword();
      const createdUser = await userRepository.save(newUser);

      // Create a default organization for the user
      const organization = new Organization();
      organization.name = `${newUser.firstName}'s Organization`;

      // Save the organization
      const savedOrganization = await organizationRepository.save(organization);

      // Associate the user with the organization
      createdUser.organizations = [savedOrganization];
      savedOrganization.users = [createdUser];

      // Save the associations to the database
      const finalUser = await userRepository.save(createdUser);

      console.log(finalUser)

      // Sign JWT token
      const jwtPayload: JwtPayload = {
        userId: createdUser.userId,
        firstName: createdUser.firstName,
        email: createdUser.email,
        role: createdUser.role as Role,
        created_at: createdUser.created_at,
      };

      const token = createJwtToken(jwtPayload);

      res.customSuccess(200, 'success', 'Registration successful.', {
        accessToken: token,
        user: {
          userId: createdUser.userId,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
          phone: createdUser.phone,
        },
      });
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `Registration unsuccessful`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
