import { FILTER_PROPERTIES } from '@/core/utils/constants';

export function Filterable(): PropertyDecorator {
  return function (target, propertyKey) {
    const filterProperties =
      Reflect.getMetadata(`${FILTER_PROPERTIES}`, target.constructor) ?? [];

    Reflect.defineMetadata(
      `${FILTER_PROPERTIES}`,
      [...filterProperties, propertyKey],
      target.constructor,
    );
  };
}
