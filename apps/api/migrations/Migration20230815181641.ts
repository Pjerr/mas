import { Migration } from '@mikro-orm/migrations';

export class Migration20230815181641 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "variant" ("id" uuid not null, "price" int not null, "disabled" boolean not null default false, "properties" jsonb null, "part_id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, constraint "variant_pkey" primary key ("id"));');

    this.addSql('alter table "variant" add constraint "variant_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "variant" cascade;');
  }

}
