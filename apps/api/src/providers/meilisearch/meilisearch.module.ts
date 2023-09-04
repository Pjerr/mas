import { MEILI_CLIENT, MEILI_MODULE_OPTIONS } from '@/core/utils/constants';
import {
  MeiliModuleAsyncOptions,
  MeiliModuleOptions,
  createAsyncProviders,
  createConnectionFactory,
} from '@/providers/meilisearch';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

@Global()
@Module({})
export class MeiliSearchModule {
  public static forRootAsync(options: MeiliModuleAsyncOptions): DynamicModule {
    const connectionProvider: Provider = {
      provide: MEILI_CLIENT,
      useFactory: (meiliOptions: MeiliModuleOptions) =>
        createConnectionFactory(meiliOptions),
      inject: [MEILI_MODULE_OPTIONS],
    };

    const asyncProviders = createAsyncProviders(options);

    return {
      module: MeiliSearchModule,
      imports: options.imports || [],
      providers: [...asyncProviders, connectionProvider],
      exports: [connectionProvider],
    };
  }
}
