import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../dbCreateConnection'
import { Role } from '../entities/users/types';
import { User } from '../entities/users/User';

export class SeedUsers1590519635401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    const userRepository = dataSource.getRepository(User);


    user.firstName = 'Walter';
    user.lastName = 'White';
    user.email = 'admin@admin.com';
    user.password = 'pass1';
    user.hashPassword();
    user.role = 'ADMINISTRATOR' as Role;
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Jesse';
    user.lastName  = 'Pinkman';
    user.email = 'standard@standard.com';
    user.password = 'pass1';
    user.hashPassword();
    user.role = 'STANDARD' as Role;
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Skyler';
    user.lastName = 'White';
    user.email = 'skyler.white@test.com';
    user.password = 'pass1';
    user.hashPassword();
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Hank';
    user.lastName = 'Schrader';
    user.email = 'hank.schrader@test.com';
    user.password = 'pass1';
    user.hashPassword();
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Marie';
    user.lastName = 'Schrader';
    user.email = 'marie.schrader@test.com';
    user.password = 'pass1';
    user.hashPassword();
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Saul';
    user.lastName = 'Goodman';
    user.email = 'saul.goodman@test.com';
    user.password = 'pass1';
    user.hashPassword();
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Gustavo';
    user.lastName = 'Fring';
    user.email = 'gustavo.fring@test.com';
    user.password = 'pass1';
    user.hashPassword();
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Michael';
    user.lastName = 'Ehrmantraut';
    user.email = 'michael.ehrmantraut@test.com';
    user.password = 'pass1';
    user.hashPassword();
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Hector';
    user.lastName = 'Salamanca';
    user.email = 'hector.salamanca@test.com';
    user.password = 'pass1';
    user.hashPassword();
    await userRepository.save(user);

    user = new User();
    user.firstName = 'Alberto';
    user.lastName = 'Salamanca';
    user.email = 'alberto.salamanca@test.com';
    user.password = 'pass1';
    user.hashPassword();
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
