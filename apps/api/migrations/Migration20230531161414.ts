import { Migration } from '@mikro-orm/migrations';

export class Migration20230531161414 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop index "group_searchable_name_index";');
    this.addSql('alter table "group" rename column "searchable_name" to "search_index";');
    this.addSql('create index "group_search_index_index" on "public"."group" using gin("search_index");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "group_search_index_index";');
    this.addSql('alter table "group" rename column "search_index" to "searchable_name";');
    this.addSql('create index "group_searchable_name_index" on "public"."group" using gin("searchable_name");');
  }

}
