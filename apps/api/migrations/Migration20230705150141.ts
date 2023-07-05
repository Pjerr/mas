import { Migration } from '@mikro-orm/migrations';

export class Migration20230705150141 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "manufacturer" drop column "address";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "manufacturer" add column "address" varchar(255) not null;');
  }

}
