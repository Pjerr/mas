import { MeiliModuleAsyncOptions, MeiliModuleOptions } from '@/providers/meilisearch/interfaces';
import { Provider } from '@nestjs/common';
import MeiliSearch from 'meilisearch';
export declare function createConnectionFactory(options: MeiliModuleOptions): MeiliSearch;
export declare function createAsyncOptionsProvider(options: MeiliModuleAsyncOptions): Provider;
export declare function createAsyncProviders(options: MeiliModuleAsyncOptions): Provider[];
//# sourceMappingURL=create-meilisearch.providers.d.ts.map