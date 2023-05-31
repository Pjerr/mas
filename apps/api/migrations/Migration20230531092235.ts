import { Migration } from '@mikro-orm/migrations';

export class Migration20230531092235 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "attribute_option" drop column "additional_price";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "attribute_option" add column "additional_price" int null;');
  }

}
