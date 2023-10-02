import { Migration } from '@mikro-orm/migrations';

export class Migration20230930103607 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "part" drop constraint "part_category_id_foreign";');

    this.addSql('alter table "part" drop column "category_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "part" add column "category_id" uuid null;');
    this.addSql('alter table "part" add constraint "part_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete set null;');
  }

}
