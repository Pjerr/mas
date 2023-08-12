import { Migration } from '@mikro-orm/migrations';

export class Migration20230712114835 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "part" add column "publish_status" varchar(255) null default \'draft\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "part" drop column "publish_status";');
  }

}
