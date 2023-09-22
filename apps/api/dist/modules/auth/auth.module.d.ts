import { AuthModuleConfig } from '@/modules/auth/auth.config';
import { DynamicModule, MiddlewareConsumer, NestModule } from '@nestjs/common';
export declare class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
    static forRoot({ connectionURI, apiKey, appInfo, }: AuthModuleConfig): DynamicModule;
}
//# sourceMappingURL=auth.module.d.ts.map