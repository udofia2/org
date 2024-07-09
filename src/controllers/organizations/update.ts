import { StringExpressionOperator } from 'mongoose';
import { dataSource } from '../../orm/dbCreateConnection';

import { Organization } from '../../orm/entities/organization/Organization';

export const updatePackageStatus = async (packageId: string,) => {
  const OrganizationRepository = dataSource.getRepository(Organization);

  const packageToUpdate = await OrganizationRepository.findOne({ where: { orgId: packageId } });
  if (packageToUpdate) {
    // packageToUpdate.status = newStatus;
    await OrganizationRepository.save(packageToUpdate);
  }
};
