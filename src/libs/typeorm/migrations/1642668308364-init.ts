import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1642668308364 implements MigrationInterface {
    name = 'init1642668308364';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "acronyms" ("id" character varying NOT NULL, "acronym" character varying NOT NULL, "definition" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_189d43b9ce928ec96c0899c1cf5" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "acronyms"`);
    }
}