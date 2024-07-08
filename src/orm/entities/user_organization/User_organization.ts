import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../users/User';
import { Organisation } from '../organization/Organization';

@Entity('user_organizations')
export class UserOrganisation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.userId)
  user: User;

  @ManyToMany(() => Organisation, (organisation) => organisation.orgId)
  organisation: Organisation;
}