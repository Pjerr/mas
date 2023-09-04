export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class Sort {
  field?: string;
  order?: SortOrder;
}
