import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1642668308364 implements MigrationInterface {
    name = 'init1642668308364';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "acronyms" ("id" character varying NOT NULL, "acronym" character varying NOT NULL, "definition" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_189d43b9ce928ec96c0899c1cf5" PRIMARY KEY ("id"))`
        );

        await queryRunner.query(
            `CREATE TABLE "users" ("id" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL,"last_logged_in_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "acronyms"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}