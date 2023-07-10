import { UpdatePart } from './update-part.request';

export class MultipleUpdatePart {
  payloads: UpdatePart[];
}

export class BulkUpdatePrice {
  payloads: number[];
}
