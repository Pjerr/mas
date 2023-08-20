import { Migration } from '@mikro-orm/migrations';

export class Migration20230820084327 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "variant" add column "image_uploaded" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "variant" drop column "image_uploaded";');
  }

}
