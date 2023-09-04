import { MEILI_CLIENT } from '@/core/utils/constants';
import { Inject } from '@nestjs/common';

export function InjectMeiliSearch() {
  return Inject(MEILI_CLIENT);
}
