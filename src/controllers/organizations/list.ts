import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Organization } from '../../orm/entities/organization/Organization';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.jwtPayload.userId;

  const userRepository = dataSource.getRepository(User);
  const OrganizationRepository = dataSource.getRepository(Organization);

  try {
    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      const customError = new CustomError(400, 'General', 'User not found.', []);
      return next(customError);
    }
    const organization = await OrganizationRepository.find({
      select: {
        orgId: true,
        name: true,
        description: true,
      },
      relations: { users: true },
      where: {
        users: {
          userId: user.userId,
        },
      },
    });

    if (!Organization) {
      const customError = new CustomError(404, 'General', 'Organization not found.', []);
      return next(customError);
    }

    res.customSuccess(200, 'success', 'List of Organizations.', {
      organizations: organization.map((org) => {
        return { orgId: org.orgId, name: org.name, description: org.description };
      }),
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Can"t retrieve list of Organizations', null, err);
    return next(customError);
  }
};

//To demonstrate authorization, you can only view the list of parcels you are created/sent
