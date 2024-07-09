import { MigrationInterface, QueryRunner } from "typeorm";

export class Asdf1720459810045 implements MigrationInterface {
    name = 'Asdf1720459810045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "FK_48cf380419183950dce95860e6f"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "PK_bd5a04b9be15ee3895707072d4f"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "org_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "org_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "PK_bd5a04b9be15ee3895707072d4f" PRIMARY KEY ("org_id")`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "FK_11d4cd5202bd8914464f4bec379"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "PK_48cf380419183950dce95860e6f" PRIMARY KEY ("orgId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11d4cd5202bd8914464f4bec37"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "PK_48cf380419183950dce95860e6f"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51" PRIMARY KEY ("orgId", "userId")`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "PK_11d4cd5202bd8914464f4bec379" PRIMARY KEY ("userId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48cf380419183950dce95860e6"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP COLUMN "orgId"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD "orgId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "PK_11d4cd5202bd8914464f4bec379"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51" PRIMARY KEY ("userId", "orgId")`);
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
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "PK_11d4cd5202bd8914464f4bec379" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP COLUMN "orgId"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD "orgId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_48cf380419183950dce95860e6" ON "user_organizations" ("orgId") `);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "PK_11d4cd5202bd8914464f4bec379"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51" PRIMARY KEY ("orgId", "userId")`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "PK_48cf380419183950dce95860e6f" PRIMARY KEY ("orgId")`);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_11d4cd5202bd8914464f4bec37" ON "user_organizations" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_organizations" DROP CONSTRAINT "PK_48cf380419183950dce95860e6f"`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "PK_83019dfa3674b0a4bbd4eb05d51" PRIMARY KEY ("userId", "orgId")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_96aac72f1574b88752e9fb00089"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "user_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "FK_11d4cd5202bd8914464f4bec379" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP CONSTRAINT "PK_bd5a04b9be15ee3895707072d4f"`);
        await queryRunner.query(`ALTER TABLE "organizations" DROP COLUMN "org_id"`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD "org_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organizations" ADD CONSTRAINT "PK_bd5a04b9be15ee3895707072d4f" PRIMARY KEY ("org_id")`);
        await queryRunner.query(`ALTER TABLE "user_organizations" ADD CONSTRAINT "FK_48cf380419183950dce95860e6f" FOREIGN KEY ("orgId") REFERENCES "organizations"("org_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
