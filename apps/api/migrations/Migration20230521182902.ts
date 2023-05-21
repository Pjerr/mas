import { Migration } from '@mikro-orm/migrations';

export class Migration20230521182902 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" uuid not null, "name" varchar(255) not null, "search_index" tsvector not null, "parent_id_id" uuid null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, constraint "category_pkey" primary key ("id"));');
    this.addSql('create index "category_search_index_index" on "public"."category" using gin("search_index");');

    this.addSql('create table "group" ("id" uuid not null, "name" varchar(255) not null, "searchable_name" tsvector null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, constraint "group_pkey" primary key ("id"));');
    this.addSql('create index "group_searchable_name_index" on "public"."group" using gin("searchable_name");');

    this.addSql('create table "attribute" ("id" uuid not null, "property_key" varchar(255) not null, "display_name" varchar(255) not null, "search_index" tsvector not null, "editor_type" text check ("editor_type" in (\'checkbox\', \'text-input\', \'number-input\', \'select\', \'datetime\', \'multiple-select\', \'image\', \'options\')) not null default \'text-input\', "editor_validation" text check ("editor_validation" in (\'none\', \'decimal-number\', \'integer-number\', \'email\', \'url\', \'letters\', \'a-z_0-9\', \'array\', \'select\')) not null default \'none\', "group_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "additional_metadata" jsonb null, constraint "attribute_pkey" primary key ("id"));');
    this.addSql('alter table "attribute" add constraint "attribute_property_key_unique" unique ("property_key");');
    this.addSql('create index "attribute_search_index_index" on "public"."attribute" using gin("search_index");');

    this.addSql('create table "attribute_option" ("id" uuid not null, "value" varchar(255) not null, "additional_price" int null, "sku" varchar(255) not null, "display_name" varchar(255) not null, "attribute_id_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, constraint "attribute_option_pkey" primary key ("id"));');
    this.addSql('alter table "attribute_option" add constraint "attribute_option_sku_unique" unique ("sku");');
    this.addSql('alter table "attribute_option" add constraint "attribute_option_display_name_unique" unique ("display_name");');

    this.addSql('create table "manufacturer" ("id" uuid not null, "name" varchar(255) not null, "address" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, constraint "manufacturer_pkey" primary key ("id"));');

    this.addSql('create table "car" ("id" varchar(255) not null, "name" varchar(255) not null, "status" text check ("status" in (\'in-stock\', \'out-of-stock\')) not null default \'in-stock\', "search_index" tsvector not null, "properties" jsonb null, "manufacturer_id_id" uuid not null, "category_id_id" uuid null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, constraint "car_pkey" primary key ("id"));');
    this.addSql('create index "car_search_index_index" on "public"."car" using gin("search_index");');

    this.addSql('create table "car_attributes" ("car_id" varchar(255) not null, "attribute_id" uuid not null, constraint "car_attributes_pkey" primary key ("car_id", "attribute_id"));');

    this.addSql('alter table "category" add constraint "category_parent_id_id_foreign" foreign key ("parent_id_id") references "category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "attribute" add constraint "attribute_group_id_foreign" foreign key ("group_id") references "group" ("id") on update cascade;');

    this.addSql('alter table "attribute_option" add constraint "attribute_option_attribute_id_id_foreign" foreign key ("attribute_id_id") references "attribute" ("id") on update cascade;');

    this.addSql('alter table "car" add constraint "car_manufacturer_id_id_foreign" foreign key ("manufacturer_id_id") references "manufacturer" ("id") on update cascade;');
    this.addSql('alter table "car" add constraint "car_category_id_id_foreign" foreign key ("category_id_id") references "category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "car_attributes" add constraint "car_attributes_car_id_foreign" foreign key ("car_id") references "car" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "car_attributes" add constraint "car_attributes_attribute_id_foreign" foreign key ("attribute_id") references "attribute" ("id") on update cascade on delete cascade;');
  }

}
