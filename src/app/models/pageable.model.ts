export interface PageableModel<T = any> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any[];
  size: number;
  sort: number;
  totalElements: number;
  totalPages: number;
}
