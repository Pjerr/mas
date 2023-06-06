import { Migration } from '@mikro-orm/migrations';

export class Migration20230606200833 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "attribute_option" drop constraint "attribute_option_attribute_id_id_foreign";');

    this.addSql('alter table "attribute_option" rename column "attribute_id_id" to "attribute_id";');
    this.addSql('alter table "attribute_option" add constraint "attribute_option_attribute_id_foreign" foreign key ("attribute_id") references "attribute" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "attribute_option" drop constraint "attribute_option_attribute_id_foreign";');

    this.addSql('alter table "attribute_option" rename column "attribute_id" to "attribute_id_id";');
    this.addSql('alter table "attribute_option" add constraint "attribute_option_attribute_id_id_foreign" foreign key ("attribute_id_id") references "attribute" ("id") on update cascade;');
  }

}
