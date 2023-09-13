import { Migration } from '@mikro-orm/migrations';

export class Migration20230913153442 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "attribute" drop constraint if exists "attribute_editor_type_check";');
    this.addSql('alter table "attribute" drop constraint if exists "attribute_editor_validation_check";');

    this.addSql('drop index "category_search_index_index";');
    this.addSql('alter table "category" drop column "search_index";');

    this.addSql('drop index "group_search_index_index";');
    this.addSql('alter table "group" drop column "search_index";');

    this.addSql('alter table "attribute" alter column "editor_type" type text using ("editor_type"::text);');
    this.addSql('alter table "attribute" add constraint "attribute_editor_type_check" check ("editor_type" in (\'checkbox\', \'text-input\', \'number-input\', \'select\', \'datetime\', \'multiple-select\', \'image\', \'options\', \'button\', \'creatable-select\'));');
    this.addSql('alter table "attribute" alter column "editor_validation" type text using ("editor_validation"::text);');
    this.addSql('alter table "attribute" add constraint "attribute_editor_validation_check" check ("editor_validation" in (\'none\', \'text\', \'number\', \'email\', \'url\', \'array\', \'select\'));');
    this.addSql('drop index "attribute_search_index_index";');
    this.addSql('alter table "attribute" drop column "search_index";');

    this.addSql('drop index "manufacturer_search_index_index";');
    this.addSql('alter table "manufacturer" drop column "search_index";');

    this.addSql('drop index "part_search_index_index";');
    this.addSql('alter table "part" drop column "search_index";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "attribute" drop constraint if exists "attribute_editor_type_check";');
    this.addSql('alter table "attribute" drop constraint if exists "attribute_editor_validation_check";');

    this.addSql('alter table "category" add column "search_index" tsvector not null;');
    this.addSql('create index "category_search_index_index" on "public"."category" using gin("search_index");');

    this.addSql('alter table "group" add column "search_index" tsvector null;');
    this.addSql('create index "group_search_index_index" on "public"."group" using gin("search_index");');

    this.addSql('alter table "attribute" add column "search_index" tsvector not null;');
    this.addSql('alter table "attribute" alter column "editor_type" type text using ("editor_type"::text);');
    this.addSql('alter table "attribute" add constraint "attribute_editor_type_check" check ("editor_type" in (\'checkbox\', \'text-input\', \'number-input\', \'select\', \'datetime\', \'multiple-select\', \'image\', \'options\', \'button\'));');
    this.addSql('alter table "attribute" alter column "editor_validation" type text using ("editor_validation"::text);');
    this.addSql('alter table "attribute" add constraint "attribute_editor_validation_check" check ("editor_validation" in (\'none\', \'decimal-number\', \'integer-number\', \'email\', \'url\', \'letters\', \'a-z_0-9\', \'array\', \'select\'));');
    this.addSql('create index "attribute_search_index_index" on "public"."attribute" using gin("search_index");');

    this.addSql('alter table "manufacturer" add column "search_index" tsvector not null;');
    this.addSql('create index "manufacturer_search_index_index" on "public"."manufacturer" using gin("search_index");');

    this.addSql('alter table "part" add column "search_index" tsvector not null;');
    this.addSql('create index "part_search_index_index" on "public"."part" using gin("search_index");');
  }

}
