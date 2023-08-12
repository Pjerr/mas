import { Migration } from '@mikro-orm/migrations';

export class Migration20230717153553 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "option_config" drop constraint "option_config_option_id_foreign";');

    this.addSql('alter table "option_config" add column "part_id" varchar(255) null;');
    this.addSql('alter table "option_config" alter column "option_id" drop default;');
    this.addSql('alter table "option_config" alter column "option_id" type uuid using ("option_id"::text::uuid);');
    this.addSql('alter table "option_config" alter column "option_id" drop not null;');
    this.addSql('alter table "option_config" add constraint "option_config_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade on delete set null;');
    this.addSql('alter table "option_config" add constraint "option_config_option_id_foreign" foreign key ("option_id") references "attribute_option" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "option_config" drop constraint "option_config_part_id_foreign";');
    this.addSql('alter table "option_config" drop constraint "option_config_option_id_foreign";');

    this.addSql('alter table "option_config" alter column "option_id" drop default;');
    this.addSql('alter table "option_config" alter column "option_id" type uuid using ("option_id"::text::uuid);');
    this.addSql('alter table "option_config" alter column "option_id" set not null;');
    this.addSql('alter table "option_config" drop column "part_id";');
    this.addSql('alter table "option_config" add constraint "option_config_option_id_foreign" foreign key ("option_id") references "attribute_option" ("id") on update cascade;');
  }

}
