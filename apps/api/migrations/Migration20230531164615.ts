import { Migration } from '@mikro-orm/migrations';

export class Migration20230531164615 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "manufacturer" add column "search_index" tsvector not null;');
    this.addSql('create index "manufacturer_search_index_index" on "public"."manufacturer" using gin("search_index");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "manufacturer_search_index_index";');
    this.addSql('alter table "manufacturer" drop column "search_index";');
  }

}
