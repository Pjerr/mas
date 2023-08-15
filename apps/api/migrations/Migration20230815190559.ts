import { Migration } from '@mikro-orm/migrations';

export class Migration20230815190559 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "option_config" drop constraint "option_config_part_id_foreign";');

    this.addSql('alter table "variant" drop constraint "variant_part_id_foreign";');

    this.addSql('alter table "option_config" add constraint "option_config_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "variant" drop column "updated_at";');
    this.addSql('alter table "variant" add constraint "variant_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "option_config" drop constraint "option_config_part_id_foreign";');

    this.addSql('alter table "variant" drop constraint "variant_part_id_foreign";');

    this.addSql('alter table "option_config" add constraint "option_config_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade;');

    this.addSql('alter table "variant" add column "updated_at" timestamptz(0) null;');
    this.addSql('alter table "variant" add constraint "variant_part_id_foreign" foreign key ("part_id") references "part" ("id") on update cascade;');
  }

}
