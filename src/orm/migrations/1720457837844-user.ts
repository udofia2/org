import { MigrationInterface, QueryRunner } from "typeorm";

export class User1720457837844 implements MigrationInterface {
    name = 'User1720457837844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organizations" ("org_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd5a04b9be15ee3895707072d4f" PRIMARY KEY ("org_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "phone" character varying, "role" character varying(30) NOT NULL DEFAULT 'STANDARD', "is_active" boolean NOT NULL DEFAULT true, "language" character varying(15) NOT NULL DEFAULT 'en-US', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user_organizations" ("userId" integer NOT NULL, "orgId" integer NOT NULL, CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51" PRIMARY KEY ("userId", "orgId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_11d4cd5202bd8914464f4bec37" ON "user_organizations" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_48cf380419183950dce95860e6" ON "user_organizations" ("orgId") `);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "FK_11d4cd5202bd8914464f4bec379" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "FK_48cf380419183950dce95860e6f" FOREIGN KEY ("orgId") REFERENCES "organizations"("org_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "FK_48cf380419183950dce95860e6f"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "FK_11d4cd5202bd8914464f4bec379"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48cf380419183950dce95860e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11d4cd5202bd8914464f4bec37"`);
        await queryRunner.query(`DROP TABLE "user_organizations"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "organizations"`);
    }

}
