import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('organizations')
export class Organisation {
  @PrimaryGeneratedColumn()
  orgId: number;

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
}
