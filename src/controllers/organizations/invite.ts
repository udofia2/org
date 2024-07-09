import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';
import { CustomError, newCustomError } from 'utils/response/custom-error/CustomError';
import { User } from '../../orm/entities/users/User';
import { Organization } from '../../orm/entities/organization/Organization';

export const inviteToOrganization = async (req: Request, res: Response, next: NextFunction) => {

  const userRepository = dataSource.getRepository(User);
  const OrganizationRepository = dataSource.getRepository(Organization);

  try {
    const userId = req.jwtPayload.userId;

    const user = await userRepository.findOne({ where: { userId } });

    if (!user) {
      const customError = new CustomError(400, 'General', 'User not found.', []);
      return next(customError);
    }

    const invitedUser = await userRepository.findOne({ where: { userId: req.body.userId } });

    if (!invitedUser) {
      const customError = new CustomError(400, 'General', 'User not found.', []);
      return next(customError);
    }

    try {
      const organization = await OrganizationRepository.findOne({
        select: { users: { userId: true, email: true } },
        relations: { users: true },
        where: {
          orgId: req.params.OrganizationId,
          users: {
            userId: user.userId,
          },
        },
      });
console.log(organization);

      if (!organization) {
        const customError = new CustomError(404, 'General', 'Organization not found.', []);
        return next(customError);
      }

      organization.users = [...organization.users, invitedUser];

      const org = await OrganizationRepository.save(organization);

console.log(org)
      res.customSuccess(201, 'success', 'User added to organization successfully.');
    } catch (err) {
      const customError = new newCustomError(400, 400, 'Bad Request', 'Client error');
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
