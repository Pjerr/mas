import { IDatabaseDriver, Connection } from '@mikro-orm/core';
import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
export declare class MikroOrmService implements MikroOrmOptionsFactory {
    private configService;
    constructor(configService: ConfigService);
    createMikroOrmOptions(contextName?: string): MikroOrmModuleOptions<IDatabaseDriver<Connection>> | Promise<MikroOrmModuleOptions<IDatabaseDriver<Connection>>>;
}
//# sourceMappingURL=mikro-orm.service.d.ts.map