import { Migration } from '@mikro-orm/migrations';

export class Migration20230808171431 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "option_config_variants" drop constraint "option_config_variants_variant_id_foreign";');

    this.addSql('drop table if exists "variant" cascade;');

    this.addSql('drop table if exists "option_config_variants" cascade;');

    this.addSql('alter table "attribute_option" drop constraint "attribute_option_attribute_id_foreign";');

    this.addSql('alter table "option_config" drop constraint "option_config_part_id_foreign";');

    this.addSql('alter table "attribute_option" add constraint "attribute_option_attribute_id_foreign" foreign key ("attribute_id") references "attribute" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "option_config" alter column "part_id" type varchar(255) using ("part_id"::varchar(255));');
    this.addSql('alter table "option_config" alter column "part_id" set not null;');
    this.addSql('alter table "option_config" add constraint "option_config_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "variant" ("id" uuid not null, "part_id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, constraint "variant_pkey" primary key ("id"));');

    this.addSql('create table "option_config_variants" ("option_config_id" uuid not null, "variant_id" uuid not null, constraint "option_config_variants_pkey" primary key ("option_config_id", "variant_id"));');

    this.addSql('alter table "variant" add constraint "variant_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade;');

    this.addSql('alter table "option_config_variants" add constraint "option_config_variants_option_config_id_foreign" foreign key ("option_config_id") references "option_config" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "option_config_variants" add constraint "option_config_variants_variant_id_foreign" foreign key ("variant_id") references "variant" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "attribute_option" drop constraint "attribute_option_attribute_id_foreign";');

    this.addSql('alter table "option_config" drop constraint "option_config_part_id_foreign";');

    this.addSql('alter table "attribute_option" add constraint "attribute_option_attribute_id_foreign" foreign key ("attribute_id") references "attribute" ("id") on update cascade;');

    this.addSql('alter table "option_config" alter column "part_id" type varchar(255) using ("part_id"::varchar(255));');
    this.addSql('alter table "option_config" alter column "part_id" drop not null;');
    this.addSql('alter table "option_config" add constraint "option_config_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade on delete set null;');
  }

}
