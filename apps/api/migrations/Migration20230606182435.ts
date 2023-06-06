import { Migration } from '@mikro-orm/migrations';

export class Migration20230606182435 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "part" drop constraint "part_category_id_id_foreign";');

    this.addSql('alter table "part" alter column "manufacturer_id_id" drop default;');
    this.addSql('alter table "part" alter column "manufacturer_id_id" type uuid using ("manufacturer_id_id"::text::uuid);');
    this.addSql('alter table "part" alter column "manufacturer_id_id" drop not null;');
    this.addSql('alter table "part" add constraint "part_category_id_id_foreign" foreign key ("category_id_id") references "category" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "part" drop constraint "part_category_id_id_foreign";');

    this.addSql('alter table "part" alter column "manufacturer_id_id" drop default;');
    this.addSql('alter table "part" alter column "manufacturer_id_id" type uuid using ("manufacturer_id_id"::text::uuid);');
    this.addSql('alter table "part" alter column "manufacturer_id_id" set not null;');
    this.addSql('alter table "part" add constraint "part_category_id_id_foreign" foreign key ("category_id_id") references "category" ("id") on update cascade on delete set null;');
  }

}
