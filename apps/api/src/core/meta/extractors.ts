import { FILTER_PROPERTIES } from '@/core/utils/constants';

export const extractFilterableMetadata = (target: object): string[] => {
  return Reflect.getMetadata(`${FILTER_PROPERTIES}`, target);
};
