import { MEILI_MODULE_OPTIONS } from '@/core/utils/constants';
import {
  MeiliModuleAsyncOptions,
  MeiliModuleOptions,
  MeiliModuleOptionsFactory,
} from '@/providers/meilisearch/interfaces';
import { Provider, Type } from '@nestjs/common';
import MeiliSearch from 'meilisearch';

export function createConnectionFactory(options: MeiliModuleOptions) {
  return new MeiliSearch(options);
}

export function createAsyncOptionsProvider(
  options: MeiliModuleAsyncOptions,
): Provider {
  if (options.useFactory) {
    return {
      provide: MEILI_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
  return {
    provide: MEILI_MODULE_OPTIONS,
    useFactory: async (optionsFactory: MeiliModuleOptionsFactory) =>
      await optionsFactory.createMeiliOptions(),
    inject: [
      (options.useClass ||
        options.useExisting) as Type<MeiliModuleOptionsFactory>,
    ],
  };
}

export function createAsyncProviders(
  options: MeiliModuleAsyncOptions,
): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createAsyncOptionsProvider(options)];
  }
  const useClass = options.useClass as Type<MeiliModuleOptionsFactory>;
  return [
    createAsyncOptionsProvider(options),
    {
      provide: useClass,
      useClass,
    },
  ];
}
