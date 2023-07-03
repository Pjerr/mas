import { ConfigService } from '@nestjs/config';
import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { Connection } from '@mikro-orm/core/connections';
import { IDatabaseDriver } from '@mikro-orm/core/drivers';
export declare class MikroOrmService implements MikroOrmOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createMikroOrmOptions(contextName?: string): MikroOrmModuleOptions<IDatabaseDriver<Connection>> | Promise<MikroOrmModuleOptions<IDatabaseDriver<Connection>>>;
}
//# sourceMappingURL=mikro-orm.service.d.ts.map