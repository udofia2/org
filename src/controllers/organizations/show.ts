import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Organization } from '../../orm/entities/organization/Organization';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const OrganizationId = req.params.userId;

  const userId = req.jwtPayload.userId;

  const userRepository = dataSource.getRepository(User);
  const OrganizationRepository = dataSource.getRepository(Organization);

  try {
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      const customError = new CustomError(400, 'General', 'User not found.', []);
      return next(customError);
    }
    const organization = await OrganizationRepository.findOne({
      select: { users: { userId: true, email: true, } },
      relations: { users: true },
      where: {
        orgId: OrganizationId,
        users: {
          userId: user.userId,
        },
      },
    });

    if (!organization) {
      const customError = new CustomError(404, 'General', 'Organization not found.', []);
      return next(customError);
    }

    res.customSuccess(200, 'success', 'user\'s single organization', {
      orgId: organization.orgId,
      name: organization.name,
      description: organization.description,
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error getting organization.', null, err);
    return next(customError);
  }
};
