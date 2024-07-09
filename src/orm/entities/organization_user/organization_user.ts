// import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { User } from '../users/User';
// import { Organization } from '../organization/Organization';

// @Entity('user_organizations')
// export class UserOrganization {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => User, (user) => user.userId)
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @ManyToOne(() => Organization, (organization) => organization.orgId)
//   @JoinColumn({ name: 'organization_id' })
//   organization: Organization;
// }
