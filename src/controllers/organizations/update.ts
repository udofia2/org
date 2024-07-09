import { dataSource } from '../../orm/dbCreateConnection';

import { Organization } from '../../orm/entities/organization/Organization';

export const updatePackageStatus = async (packageId: string) => {
  const OrganizationRepository = dataSource.getRepository(Organization);

  const packageToUpdate = await OrganizationRepository.findOne({ where: { orgId: packageId } });
  if (packageToUpdate) {
    await OrganizationRepository.save(packageToUpdate);
  }
};
