import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';
import { CustomError, newCustomError } from 'utils/response/custom-error/CustomError';
import { User } from '../../orm/entities/users/User';
import { Organization } from '../../orm/entities/organization/Organization';

export const createOrganization = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body;

  const userRepository = dataSource.getRepository(User);
  const OrganizationRepository = dataSource.getRepository(Organization);

  try {
    const userId = req.jwtPayload.userId;

    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      const customError = new CustomError(400, 'General', 'User not found.', []);
      return next(customError);
    }

    const newOrganization = new Organization();
    newOrganization.name = name;
    newOrganization.description = description;
    newOrganization.users = [user];

    try {
      const organization = await OrganizationRepository.save(newOrganization);

      res.customSuccess(201, 'success', 'Organization created successfully.', {
        orgId: organization.orgId,
        name: organization.name,
        description: organization.description,
      });
    } catch (err) {
      const customError = new newCustomError(400, 400,  'Bad Request', 'Client error');
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
