import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../users/User';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  orgId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.organizations)
  users: User[];
}
